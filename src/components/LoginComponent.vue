<template>
  <div class="loginContainer">
    <h1>{{ isLogin ? 'Login' : 'Register' }}</h1>

    <form @submit.prevent="isLogin ? loginUser() : registerUser()" class="form-container">
      <div v-if="!isLogin" class="nameDiv">
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" v-if="!isLogin" required />
      </div>
      <div class="nameDiv">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="nameDiv">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button class="submit-button" type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
    </form>

    <div class="toggle-link">
      <p>
        {{ isLogin ? 'Don\'t have an account?' : 'Already have an account?' }}
        <a href="#" @click.prevent="toggleForm">{{ isLogin ? 'Register' : 'Login' }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isLogin: true,
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:3001/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        // this.isLogin = true;
        if (response.message === "User registered successfully") {
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('token', response.token);
        }
      } catch (error) {
        console.error('Error during registration:', error.response.data);
        alert('user already exists')
      }
    },
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3001/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        console.log('User logged in:', response);
        if (response?.status === 200) {
          localStorage.setItem("token", response?.data?.token)
          this.$router.push({ name: 'Whiteboard' });
        }

      } catch (error) {
        alert('Please enter valid credentials');
        console.error('Error during login:', error.response.data);
      }
    },
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.clearForm();
    },
    clearForm() {
      this.name = '';
      this.email = '';
      this.password = '';
    },
  },

};
</script>

<style>
.toggle-link {
  margin-top: 10px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;

}

.submit-button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

.loginContainer {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0.5px 0.2px 10px 0.5px rgb(211, 210, 208);
}

.nameDiv {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

input {
  border: 0.5px solid grey;
  height: 30px;
  width: 97%;
  border-radius: 2px;

}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}


@media screen and (max-width: 768px) {
  .loginContainer {
    width: 90%;
    padding: 20px;
  }

  .form-container {
    gap: 10px;
  }

  .submit-button {
    padding: 8px;
    font-size: 14px;
  }

  input {
    height: 28px;
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .loginContainer {
    width: 95%;
    padding: 9px;
  }

  h1 {
    font-size: 24px;
  }

  .submit-button {
    padding: 6px;
    font-size: 12px;
  }

  input {
    height: 26px;
    width: 100%;
    font-size: 14px;
  }

  .nameDiv {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
  }
}
</style>
