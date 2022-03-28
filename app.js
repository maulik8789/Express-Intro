const express = require('express');
const ExpressError = require('./ExpressError/handleError.js')

const app = express();



app.listen(5000, () => {
    console.log("Server running on port 5000");
  });

function checkForNums() {
    throw "Please provide numbers!"
}

app.get("/mean/", function (req, res, next) {
    checkForNums();
    return res.send("Please provide numbers")
})

app.get("/mean/:num", function (req, res, next) {
    try {
        let nums =  req.params.num.split(",");

        if(!nums){
            throw new ExpressError("Bad Request, Please provide numbers", 400)
        }

        for (let i of nums){
            if (!parseInt(i)) {
                throw new ExpressError("invalid input", 400)
            }
        }
      
        let total = nums.reduce((a, b) => parseInt(a) + parseInt(b), 0)
    
        let meanAnswer = total/nums.length;
        console.log('mean is', meanAnswer);
        return  res.send({meanAnswer})

    } 
    catch (e) {
        return  res.send('Invalid Input')
    }
})

app.get("/median/", function (req, res, next) {
    checkForNums();
    return res.send("Please provide numbers")
})

app.get("/median/:num", function (req, res, next) {
    try {
        let nums =  req.params.num.split(",");

        if(!nums){
            throw new ExpressError("Bad Request, Please provide numbers", 400)
        }

        nums = nums.sort(function(a, b){return parseInt(a-b)});

        for (let i of nums){
            if (!parseInt(i)) {
                throw new ExpressError("invalid input", 400)
            }
        }
        
        if(nums.length % 2 != 0){
            
            medianAnswer = nums[(nums.length-1)/2];
            console.log('median is', medianAnswer);
            return  res.send({medianAnswer})
        }
        
        if(nums.length % 2 == 0){
            let medianAnswer = (nums[nums.length/2] + nums[(nums.length/2)+1])/2;
            console.log('median is', medianAnswer);
            return  res.send({medianAnswer})
        }
        
    }
    catch (e) {
        return  res.send('Invalid Input')
    }
})


app.get("/mode/", function (req, res, next) {
    checkForNums();
    return res.send("Please provide numbers")
})


app.get("/mode/:num", function (req, res, next) {
    try{
        let nums =  req.params.num.split(",");
        
        if(!nums){
            throw new ExpressError("Bad Request, Please provide numbers", 400)
        }

        nums = nums.sort(function(a, b){return a-b});
        let counts = {};
        
        for (let i of nums) {
            if (!parseInt(i)) {
                throw new ExpressError("invalid input", 400)
            }
            counts[i] = (counts[i] + 1) || 1;
        }
    
        let maximum = Math.max(...Object.values(counts)); 
        let modeAnswer = Object.keys(counts).find(key => counts[key] == maximum);

        (maximum != 1) ? console.log('mode is', modeAnswer) : console.log('mode is none'); 
        
        return  res.send({modeAnswer})
    
    } catch (e) {
        return  res.send('Invalid Input')
    }
})
    