import React,{useState,useEffect} from 'react'
import image1 from '../assets/images/Image1.png'
import image2 from '../assets/images/Image2.png'
import image3 from '../assets/images/Image3.png'
import image4 from '../assets/images/Image4.png'
import { useParams } from 'react-router-dom'
import JoditEditor from 'jodit-react'

const Postpage = () => {

  const { postId } = useParams(); // Extract the postId from URL params
  const [post, setPost] = useState(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const selectedPost = posts.find((p) => p.id === postId);
    setPost(selectedPost);
  }, [postId]);



    const itemlist=['About' ,'Projects' ,'Blog' ,'Resume']
  
 
    return (
      <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',gap:'2rem'}}>
              <div style={{backgroundColor:"whitesmoke",display:"flex",height:"4.5rem" ,opacity:'80%',
                width:'100%',justifyContent:'center',alignItems:'center',color:'#000',position:'fixed',top:'0',zIndex:'9999'}} >
                 
                 
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
                              
                                  onMouseDown={(e)=>{(e.currentTarget.style.color='red');}}
                                  onMouseUp={(e)=>(e.currentTarget.style.color='#000')}
                                  
                                  >{i}</span>
                                )
                              })}
                              
                            </div>
                      </div>
  
                </div>
  
              <div style={{width:'100%' ,height:'30rem',display:'flex' ,alignItems:'center',justifyContent:'center',backgroundColor:''}}>
  
                   <img src={post?.featuredPhoto} style={{width:'100%' ,height:'100%' ,objectFit:'cover'}}/>
                </div> 

                <div style={{width:'90%' ,display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',background:'',maxHeight:'auto'}}>
  
                  
  
  
  
               <div dangerouslySetInnerHTML={{ __html: post?.content }} />
  
                
  
                </div> 
  
  
  
                {/* --------------- footer --------------- */}
  
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

export default Postpage