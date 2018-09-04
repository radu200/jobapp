const db = require('../.././config/database.js');
const multer = require('multer');
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')



const EditJobImage = multer({
    dest: 'public/tmp_folder/',
    limits: {
        fileSize: 5e+6
    },

    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {

            cb(" We only support PNG, GIF, or JPG pictures.")
        }
    }
}).single('job_image_edit')


module.exports.getJobsPage = (req, res, next) => {
    db.query("select * from jobs", function (err, results) {
        if (err) {
            console.log("[mysql error],", err)
        } else {
            res.render('jobs/jobs', {
                'results': results
            })
        }

    })

};


module.exports.getAddJobs = (req, res, next) => {
    res.render('jobs/add_job')
};


module.exports.postAddJobs = (req, res, next) => {


    
     const category = req.body.category;
     const position = req.body.position;
     const description = req.body.job_description;
     const city = req.body.city; 
     const employment_type = req.body.employment_type;
     const immediate_start  = req.body.immediate_start
     const salary = req.body.salary;
     const experience = req.body.experience;
     const language = req.body.language;
     const currency = req.body.currency

  
      
   

     req.checkBody('category', 'Alege Categoria').notEmpty();
     req.checkBody("position",   'Poziția  este necesară').notEmpty()
     req.checkBody('job_description','Poszitia nu trebuie sa contina cifre' ).matches(/^[a-zA-Z]*$/);
     req.checkBody('position', ' Pozitia trebuie să aibă o lungime între 1 și 70 de caractere').len(1, 70);
     req.checkBody("job_description",   'Descriere este necesara').notEmpty().isString() ;
     req.checkBody('job_description', ' Descrierea trebuie să aibă o lungime între 1 și 300 de caractere').len(1, 301);
     req.checkBody('job_description','Descrierea nu trebuie sa contina cifre' ).matches(/^[a-zA-Z]*$/)
     req.checkBody('city', "Locatia este necesara").notEmpty();
     req.checkBody('employment_type', 'Alege tipul de angajare').notEmpty();
     req.checkBody('salary', 'Salariu trebuie să aibă o lungime între 0 și 8 de cifre.').len(0,9);
     req.checkBody({'salary':{ optional: {  options: { checkFalsy: true }},isDecimal: {  errorMessage: 'Salariu trebuie sa fie decimal'} } });
     req.checkBody('salary','Formatul salariului este incorect' ).matches(/^\d{0,8}(?:\.\d{0,2})?$/);
     req.checkBody('experience', 'Alege experienta').notEmpty();



  

//     console.log('category',category)
//     console.log('position',position)
//     console.log('des',description)
//     console.log(city)
//     console.log('employement',employment_type)
//     console.log(immediate_start)
//     console.log('salary',salary)
//     console.log('experience',experience)
//    // console.log(language.toString())
//     console.log(currency)
//     // console.log('user',req.user)


        if (req.file) {
            var job_image = req.file.filename;
           
           
            sharp(req.file.path)
                .resize(500, 281)
                .toFile('./public/uploads/' + req.file.filename, (err, info) => {
                    console.log(info)

                    if (err) {
                        console.log('err', err)
                    } else {
                        //delete original image
                        fs.unlink('./public/tmp_folder/' + job_image, function (err) {
                            if (err) {
                                console.log("failed to delete file:" + err);
                            } else {
                                console.log('successfully deleted ');
                            }
                        })

                        console.log('resized success')
                    }

                });


        } else {
            let images = ['/no_job_image_a.png', '/no_job_image_b.png', '/no_job_image_c.png']; 

            let  random = images[Math.floor(Math.random() * images.length)];
            job_image = random;

          
        }
      
    //   console.log('job_image',job_image)
     


     const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
         return  res.redirect('/jobs/add')
    } else {

    if(language){
       var lang = language.toString();
    }

    if(salary != ''){
        var wage = `${salary}  LEI | `
     }else{
         wage = salary;
     };
    
        let jobs = {
                employer_id:req.user.id,
                category:category,
                position:position,
                description:description,
                city:city,
                employment_type:employment_type,
                immediate_start:immediate_start,
                salary:wage,
                experience:experience,
                language:lang,
                currency:currency,
                image: job_image
        }

    //     //creat employer
        db.query('INSERT INTO jobs SET ?', jobs, (error, results) => {

            if (error) {
                console.log('[mysql error]', error)
              
            } else {
                res.redirect('/jobs')
          
            }
        })
    }
  
};

module.exports.getJobImageEdit = (req, res, next) => {
    db.query('select id, image from jobs  where id= ?', [req.params.id], (err, results) => {

        res.render('./jobs/job_edit_image', {
            'results': results
        })
    })
}



module.exports.postJobImageEdit = (req, res, next) => {
    db.query(`select id, image from jobs where id=${req.params.id}`, (err, results) => {
        
        
        fs.unlink('./public/' + results[0].image, function (err) {
            if (err) {
                console.log("failed to delete file:" + err);
            } else {
                console.log('successfully deleted ');
            }
        })


            const errors = req.validationErrors();

            if (errors) {
                req.flash('error_msg', errors);
                return res.redirect('back')
            }

            EditJobImage(req, res, (err) => {

                if (req.file) {
                    var job_image_edit = './uploads/' + req.file.filename;
                    // resize image
                    sharp(req.file.path)
                        .resize(600, 157)
                        .toFile('./public/uploads/' + req.file.filename, (err, info) => {
                            if (err) {
                                console.log('sharp err', err)
                            } else {

                                //delete old image that was just resized
                                fs.unlink('./public/tmp_folder/' + req.file.filename, function (err) {
                                    if (err) {
                                        console.log("failed to delete file:" + err);
                                    } else {
                                        console.log('successfully deleted ');
                                    }
                                })

                                console.log('resized success')




                              
                            }
                        });


                } else {

                    let images = ['/no_job_image_a.png', '/no_job_image_b.png', '/no_job_image_c.png']; 

                    let  random = images[Math.floor(Math.random() * images.length)];
                    console.log('randon',random)
                    job_image_edit = random;
                }

                let image = {
                    image: job_image_edit
                }



                //creat employer
                db.query(`update jobs set ? where id =${req.params.id}`, image, (error, results) => {

                    if (err) {
                         console.log('[mysql error]', error)
                        // res.status(500).json({
                        //     error: err
                        // });
                    } else {
                        // res.status(200).json({
                        //     message: "image succefully edited"

                        // })
                        // console.log(req.file.path)
                      

                        res.redirect('/my_jobs')
                    }


                })
            })


        
         
    }) //db select query ends


}; //module ends



//employer jobs
module.exports.getEmployerJobs = (req,res, next) => {
    db.query("select * from jobs where employer_id = ? ",[req.user.id], function (err, results) {
        if (err) {
            console.log("[mysql error],", err)
        } else {

            // res.json(results)
            res.render('jobs/employer_jobs', {
                'results': results
            })
        }


    })
}

//employer jobs
module.exports.getEmployerJobEdit = (req,res, next) => {
    db.query("select * from jobs where id = ? ",[req.params.id], function (err, results) {
        if (err) {
            console.log("[mysql error],", err)
        } else {
            res.render('jobs/jobs_edit_info', {
                'result': results[0]
            })
        }
         console.log(results)

    })
}


//employer jobs
module.exports.postEmployerJobEdit = (req,res, next) => {
     
    const category = req.body.category;
    const position = req.body.position;
    const description = req.body.job_description;
    const city = req.body.city; 
    const employment_type = req.body.employment_type;
    const immediate_start  = req.body.immediate_start
    const salary = req.body.salary;
    const experience = req.body.experience;
    const language = req.body.language;
    const currency = req.body.currency

 
     
  

    req.checkBody('category', 'Alege Categoria').notEmpty();
    req.checkBody("position",   'Poziția  este necesară').notEmpty()
    req.checkBody('job_description','Poszitia nu trebuie sa contina cifre' ).matches(/^[a-zA-Z]*$/);
    req.checkBody('position', ' Pozitia trebuie să aibă o lungime între 1 și 70 de caractere').len(1, 70);
    req.checkBody("job_description",   'Descriere este necesara').notEmpty().isString() ;
    req.checkBody('job_description', ' Descrierea trebuie să aibă o lungime între 1 și 300 de caractere').len(1, 301);
    req.checkBody('job_description','Descrierea nu trebuie sa contina cifre' ).matches(/^[a-zA-Z]*$/)
    req.checkBody('city', "Locatia este necesara").notEmpty();
    req.checkBody('employment_type', 'Alege tipul de angajare').notEmpty();
    req.checkBody('salary', 'Salariu trebuie să aibă o lungime între 0 și 8 de cifre.').len(0,9);
    req.checkBody({'salary':{ optional: {  options: { checkFalsy: true }},isDecimal: {  errorMessage: 'Salariu trebuie sa fie decimal'} } });
    req.checkBody('salary','Formatul salariului este incorect' ).matches(/^\d{0,8}(?:\.\d{0,2})?$/);
    // req.checkBody('experience', 'Alege experienta').notEmpty();


    console.log('category',category)
    console.log('position',position)
    console.log('des',description)
    console.log(city)
    console.log('employement',employment_type)
    console.log(immediate_start)
    console.log('salary',salary)
    console.log('experience',experience)
   // console.log(language.toString())
    console.log(currency)
    // console.log('user',req.user)



    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
         return  res.redirect('back')
    } else {

    if(language){
       var lang = language.toString();
    }

    if(salary != ''){
        var wage = `${salary}  LEI | `
     }else{
         wage = salary;
     };
    
        let job = {
                category:category,
                position:position,
                description:description,
                city:city,
                employment_type:employment_type,
                immediate_start:immediate_start,
                salary:wage,
                experience:experience,
                language:lang,
                currency:currency,
               
        }

    db.query(`UPDATE jobs SET  ? WHERE id =${req.params.id}`,job, function (err, results) {
        if (err) {
            console.log("[mysql error],", err)
        }else{

            res.redirect('/my_jobs')
        }
       
    })

  }
}