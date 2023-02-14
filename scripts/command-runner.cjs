const { exec } = require("child_process");

module.exports = command => {
    exec(command, (error, stdout) => {
        const message = error ? error : stdout;
        console.log(message);
    });
};
