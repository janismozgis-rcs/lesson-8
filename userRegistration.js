import querystring from 'querystring';

const handleUserRegistration = (req) => {
    req.on('data', (chunk) => {
        const rawData = chunk.toString();
        const formData = querystring.parse(rawData);

        let errors = [];
        if (!formData.email || formData.email === '') {
            errors.push('Email is required');
        }

        if (!formData['first-name'] || formData['first-name'] === '') {
            errors.push('First name is required');
        }

        if (!formData.password || formData.password === '') {
            errors.push('Password is required');
        }

        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegexp.test(formData.email)) {
            errors.push('Invalid email');
        }

        if (errors.length > 0) {
            // show errors to the user
            let errorOutput = '<ul class="alert alert-danger">';
            
            for (let error of errors) {
                errorOutput += `<li>${error}</li>`;
            }

            errorOutput += '</ul>';
            return errorOutput;
        } 

        console.log('Yay, no errors');
        // store the data
        

    });
}

export default handleUserRegistration;