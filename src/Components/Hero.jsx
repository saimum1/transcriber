import React,{useState,useEffect} from 'react'
import boxicon from '../assets/images/linked.svg'
import behanceicon from '../assets/images/Behance.svg'
import linkedinicon from '../assets/images/Linkedin.svg'
import sicon from '../assets/images/s.svg'
import giticon from '../assets/images/github.png'
// import style from '../assets/CSS/mainstyle.css'
import image1 from '../assets/images/Image1.png'
import image2 from '../assets/images/Image2.png'
import image3 from '../assets/images/Image3.png'
import image4 from '../assets/images/Image4.png'

const Hero = () => {

  const itemlist=['About' ,'Projects' ,'Blog' ,'Resume']
  const [data,setdata]=useState([])

  const yourArray = [{
    'img':image1,
    'headline':'Whitmanpartners Website',
    'des':'Whitman Partners is more than just Client Partners, Portfolio Managers, Talent Agents, and Consultants. We are everyday people, just like you.'
  },{
    'img':image2,
    'headline':'Amway Click (Thailand)',
    'des':'Welcome to Amway Click, the new shopping platform by Amway Enjoy and get offers for new members with variety of recommended items.'
  },{
    'img':image3,
    'headline':'Relaxy - Selfcare On The Go ',
    'des':'Relaxy is your platform to express emotions in words. Embrace yourself with people far and around with diversity and inclusion.'
  },{
    'img':image4,
    'headline':'Relaxy - Selfcare On The Go ',
    'des':'Relaxy is your platform to express emotions in words. Embrace yourself with people far and around with diversity and inclusion.'
  }
  ];




  const renderpage=(e)=>{
    console.log("shoing routed name",e)
    if(e === 'Projects'){
      window.location.href = '/projects'
    }
  }

  const openpost=(e)=>{
    window.location.href = `/postpage/${e}`
  }


  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    console.log("postsss",posts)
    setdata(posts)
  }, [])
  
  return (
    <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column'}}>
            <div style={{backgroundColor:"whitesmoke",opacity:'80%',display:"flex",height:"4.5rem" ,
              width:'100%',justifyContent:'center',alignItems:'center' ,position:'fixed',top:'0',color:'#000',zIndex:'999999'}} >
               
               
                <div style={{backgroundColor:"",display:"flex",height:"100%" ,
                 width:'90%',justifyContent:'space-between',alignItems:'center' ,color:'#000'}} >
                          <div style={{height:"auto",width:'auto'}}>
                                <span>Logo</span>
                          </div>
                          <div

                  
                          
                          style={{height:"auto",width:'auto',gap:'2rem',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}}>
                            {itemlist?.map((i)=>{
                              return (
                                <span  
                                // className={style.texteffect}
                                onMouseDown={(e)=>{(e.currentTarget.style.color='red');}}
                                onMouseUp={(e)=>(e.currentTarget.style.color='#000')}
                                onClick={()=>renderpage(i)}
                                >{i}</span>
                              )
                            })}
                            
                          </div>
                    </div>

              </div>

              <div style={{width:'90%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',marginTop:'4.5rem',background:''}}>

                  <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column'}}>
                        <div style={{width:'100%' ,flex:'1',display:'flex',justifyContent:'flex-end'}}><span style={{fontSize:'10rem' ,fontWeight:'500'}}>I'M A PRODUCT</span></div>




                      <div style={{width:'100%' ,flex:'1',display:'flex',justifyContent:'space-between',alignItems:'center' ,marginRight:'30px' ,marginLeft:'30px'}}>
                        <div >
                          <span style={{fontSize:'144px' ,fontWeight:'500'}}>DESIGNER</span>
                        </div>

                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',position:'relative'}}>
                          <div style={{background:''}}> <img src={boxicon} style={{height:'auto',width:'auto'}}/> </div>  
                          <div style={{position:'absolute',bottom:'-28%',right:'-10%',display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexDirection:'column',transform:'rotate(-15deg)',letterSpacing:'-0.8px',fontWeight:'400',fontStyle:'normal',lineHeight:'28px',textAlign:'left',width:'50%',background:'',color:'#999999'}}>
                            <span style={{float:'left',display:'flex',justifyContent:'flex-start'}}>PASSIONATE ABOUT</span>
                            <span style={{float:'left',display:'flex',justifyContent:'flex-start'}}>COLLABORATION</span>
                            <span style={{float:'left',display:'flex',justifyContent:'flex-start'}}>CLOUD & UX.</span>
                          </div>
                        </div>

                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                      
                        <img src={behanceicon} /> 
                          <img src={giticon} /> 
                          <img src={linkedinicon} /> 
                          <img src={sicon} /> 

                        </div>
                      </div>
                  </div>

                <div style={{height:'4rem'}}></div>

                  <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',gap:'2rem'}}>
                        <div style={{width:'100%' ,flex:'1',display:'flex',justifyContent:'flex-start',flexDirection:'column',gap:'1rem'}}>
                          
                          <span style={{fontSize:'2rem' ,fontWeight:'500'}}> SELECTED WORK</span>
                          <span style={{backgroundColor:'#999999',width:'100%',height:'1px'}}> </span>
                          </div>




                          
                        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem',transition:'all 300ms',cursor:'pointer'}}>
                         {data?.filter((value)=> {return value?.selected === true})?.map((value, index) => (
                                <div onClick={()=>openpost(value.id)} className='box' key={index} style={{ background: '', height: '25rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', gap: '0.6rem' }}>
                                    <div style={{ flex: 4, backgroundColor: '', height: '100%', width: '100%' }}>
                                        <img src={value.featuredPhoto} style={{ height: '18rem', width: '100%' }} alt="Featured" />
                                    </div>
                                    <span style={{ flex: 1, backgroundColor: '', height: '100%', display: 'flex', width: '100%', color: '#000', fontFamily: 'Inter', fontSize: '2rem', fontWeight: '700' }}>{value.title}</span>
                                    <span style={{ flex: 2, backgroundColor: '', height: '100%', width: '100%', color: '#000', fontFamily: 'Inter', fontSize: '1rem', fontWeight: '400' }}>{value.description}</span>
                                </div>
                            ))}
                        </div>
                  </div>

                <div style={{height:'4rem'}}></div>



                <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',gap:'2rem'}}>
                        <div style={{width:'100%' ,flex:'1',display:'flex',justifyContent:'flex-start',flexDirection:'column',gap:'1rem'}}>
                          
                          <span style={{fontSize:'2rem' ,fontWeight:'500'}}> WRITING</span>
                          <span style={{backgroundColor:'#999999',width:'100%',height:'1px'}}> </span>
                          </div>




                          
                        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem',transition:'all 300ms',cursor:'pointer'}}>
                          {yourArray.map((value, index) => (
                            <div 

                            className='box'
                            key={index} style={{ background: '', height: '20rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',flexDirection:'column',gap:'0.6rem' }}>
                              <div style={{flex:4,backgroundColor:'',height:'100%' ,width:'100%'}}>
                                <img src={value.img}  style={{height:'12rem' ,width:'100%'}}/>
                              </div>
                              <span style={{flex:1,backgroundColor:'',height:'100%' ,display:'flex',width:'100%',color:'#000',fontFamily:'Inter',fontSize:'2rem',fontWeight:"700"}}>{value.headline}</span>
                              <span style={{flex:2,backgroundColor:'',height:'100%' ,width:'100%',color:'#000',fontFamily:'Inter',fontSize:'1rem',fontWeight:"400"}}>{value.des}</span>
                            </div>
                          ))}
                        </div>
                  </div>

              </div>





              <div style={{backgroundColor:"#000000",display:"flex",height:"18rem" ,
              width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'column',paddingTop:'2rem' }} >
                
                          <div style={{width: '100%',height: '3rem',backgroundColor: '',color:"white"}}>
                          <div className="marquee-w">
                            <div className="marquee">
                                <span>Let's talk &nbsp; Let's talk &nbsp; Let's talk &nbsp; Let's talk &nbsp; Let's talk &nbsp;</span>
                              
                            </div>
                           
                        </div>
                        </div>

                    
                        <div style={{height:'100%',width:'90%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                          <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',color:'white',width:'100%',height:'100%',textAlign:'justify',float:'left',fontWeight:'400',fontFamily:'Inter',lineHeight:'30px'}}>
                            <span style={{float:'left',backgroundColor:''}}>Open to explore various opportunities and </span>
                                <span style={{float:'left',backgroundColor:''}}>collaborations</span>
                          </div>

                          <div style={{flex:1}}>
                            <span>
                              <button 
                              onMouseDown={(e)=>(e.currentTarget.style.backgroundColor = '#1e0791')}
                              onMouseUp={(e)=>(e.currentTarget.style.backgroundColor = '#5033D7')}    
                              style={{backgroundColor:'#5033D7',display:'flex',
                              justifyContent:'center',alignItems:'center',border:'1px solid var(--White, #FFF)',
                              borderRadius:'4px',padding:'12px 24px',color:'var(--White, #FFF)',width:'40%',cursor:'pointer'}}>Let’s Talk</button>
                            </span>
                          </div>

                        </div>
                    

              </div>

           <style jsx>
            {`


body::-webkit-scrollbar {
  display: none;
}


body {
  -ms-overflow-style: none;
}

/* Hide scrollbar for Firefox */
body {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
            .marquee-w {
            position: relative;
            display: block;
            width: 100%;
            height: 140px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            overflow: hidden;
          }
.marquee {
  position: absolute;
  display: block;
  margin: auto auto;
  white-space: nowrap;
  overflow: hidden;
  min-width: 100%;
  height: 100%;
}
.marquee span {
  display: inline-block;
  padding-left: 100%;
  font-family: 'poppinsbold';
  text-align: center;
  -webkit-text-stroke: 1px #0055bc;
  white-space: nowrap;
  min-width: 100%;
  height: 100%;
  line-height: 140px;
  font-size: 4rem;
  animation: marquee 9s linear infinite;
}
.box{
  transition:all 300ms;
}
.box:hover{
  transform:scale(1.05);
  transition:all 300ms;
}
.marquee2 span {
  animation-delay: 5s;
}
@keyframes marquee {
  0% {
      transform: translate(0, 0);
  }
  100% {
      transform: translate(-100%, 0);
  }
}`}
           </style>
       
    </div>
  )
}

export default Hero