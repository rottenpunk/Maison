module.exports = (req, res, next) => {
    if (!(req.session.isAdmin===1)) {
        return res.redirect('/login');
    }
    next();
}

