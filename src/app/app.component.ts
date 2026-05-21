import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';

interface Theme {
  background: string;
  color: string;
  primaryColor: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  username:any;
  password:any;
  res:any;
  okay=false
  themes: Theme[] = [
    {
      background: "#1A1A2E",
      color: "#FFFFFF",
      primaryColor: "#0F3460"
    },
    {
      background: "#461220",
      color: "#FFFFFF",
      primaryColor: "#E94560"
    },
    {
      background: "#192A51",
      color: "#FFFFFF",
      primaryColor: "#967AA1"
    },
    {
      background: "#F7B267",
      color: "#000000",
      primaryColor: "#F4845F"
    },
    {
      background: "#F25F5C",
      color: "#000000",
      primaryColor: "#642B36"
    },
    {
      background: "#231F20",
      color: "#FFF",
      primaryColor: "#BB4430"
    }
  ];
  ngOnInit(){
    this.verifyToken();
  }

login(){
  if(this.username !== "" &&this.password !== "" ){
    const url = "https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=login"
    const customerdata ={
      username:this.username,
      password:this.password
    }
    this.http.post(url, customerdata).subscribe(
      (response) => {
        this.okay =true
        this.res = response
        console.log('Customer edited successfully:', response['jwt']['jwt']);
        localStorage.setItem('jwt',response['jwt']['jwt']);
        localStorage.setItem('customer_id', response['jwt']['customer_id'].toString());
        localStorage.setItem('role', response['jwt']['role'].toString());
        localStorage.setItem('id', response['jwt']['login_id']);
        localStorage.setItem('driver', response['jwt']['driver']);
      },
      (error) => {
        window.alert('Login Credentials Invalid')
        // Handle error
        console.error('Error editing customer:', error);
      }
    );
  }
  else{}
 
}
getSharedVariable() {
  return 'hi'
}
verifyToken() {
  const token = this.extractToken();
  if (token) {
    if (this.verifyToken1(token)) {
      this.okay =true
      console.log('Token is valid.');
      // Proceed with authenticated actions
    } else {
      console.error('Invalid token.');
      // Handle invalid token
    }
  } else {
    console.error('No token provided.');
  }
}

extractToken() {
  const token = localStorage.getItem('jwt');
  return token;
}

decodeToken(token: string) {
  const decoded = jwtDecode(token);
  return decoded;
}

verifyToken1(token: string) {
  const decoded = this.decodeToken(token);
  if (decoded && decoded.exp && decoded.iat) {
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp > now && decoded.iat < now) {
      return true;
    }
  }
  return false;
}

  setTheme(theme: Theme) {
    const root = document.documentElement;
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--color', theme.color);
    root.style.setProperty('--primary-color', theme.primaryColor);
  }

}