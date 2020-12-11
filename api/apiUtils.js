exports.success = (message, val, res) => {
    res.json({
        message,
        status: true,
        data: val
    }).end();
}

exports.failed = (message, errors, res) => {
    res.json({
        message,
        status: false,
        data: errors
    }).end();
}