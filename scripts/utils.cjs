module.exports = {
    getArgs() {
        return process.argv.splice(2);
    },
    handleProcess(cb) {
        return cb()
            .then(() => {
                process.exit(0);
            })
            .catch(error => {
                console.error(error);
                process.exit(1);
            });
    },
};
