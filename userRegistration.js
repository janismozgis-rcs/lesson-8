import querystring from 'querystring';
import fs from 'fs';
import path from 'path';

const filename = new URL(import.meta.url).pathname;
const dirname = path.dirname(filename);


const saveUser = (formData) => {
    // 1. load existing data from file
    const dataFilePath = path.join(dirname, 'data', 'users.json');
    const existingDataString = fs.readFileSync(dataFilePath, 'utf8');
    let existingData = JSON.parse(existingDataString);
    // 2. append the new to the existing ones
    existingData.push({
        email: formData.email,
        firstName: formData['first-name'],
        password: formData.password,
    });
    // 3. save the new array with the new user
    const newDataString = JSON.stringify(existingData);
    fs.writeFileSync(dataFilePath, newDataString);
}


const handleUserRegistration = (req, res, onErrorCallback) => {
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

        // todo:
        // last name, => text, required
        // retype password => password, must match with first password. Lenght at least 8 symols
        // country => select, required

        if (errors.length > 0) {
            // show errors to the user
            let errorOutput = '<ul class="alert alert-danger">';
            
            for (let error of errors) {
                errorOutput += `<li>${error}</li>`;
            }

            errorOutput += '</ul>';
            onErrorCallback(errorOutput);
            return;
        } 

        // store the data
        saveUser(formData);
        res.writeHead(302, {
            'Location': '/registration-successfull'
        });
        res.end('');
    });
}

export default handleUserRegistration;