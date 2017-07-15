
function Parse(req,res){
res.status(200).send({message:'parsing qr code',id:'1'})
}

module.exports = {
    Parse:Parse
}