document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.form-container form');
    const uname = loginForm.querySelector('#uname');
    const pass = loginForm.querySelector('#pass');
    const loginBtn = loginForm.querySelector('#login-btn');
    const msg = loginForm.querySelector('.msg');

    loginBtn.disabled = true; // Initially disable the login button

    loginForm.addEventListener('input', () => {
        const isEmpty = !uname.value.trim() || !pass.value.trim();
        loginBtn.disabled = isEmpty; // Enable button only if all fields are filled
        msg.innerText = isEmpty ? 'Please fill the input fields before proceeding' : 'Great! Now you can proceed';
        msg.style.color = isEmpty ? 'rgb(218, 49, 49)' : '#92ff92';
    });
});
