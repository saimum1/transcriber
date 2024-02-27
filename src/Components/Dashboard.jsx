import React,{useState,useEffect} from 'react'
import boxicon from '../assets/images/linked.svg'
import behanceicon from '../assets/images/Behance.svg'
import linkedinicon from '../assets/images/Linkedin.svg'
import sicon from '../assets/images/s.svg'
import giticon from '../assets/images/github.png'
import { useParams } from 'react-router-dom'
import Writepost from './Writepost'

const Dashboard = () => {
    const itemlist=['About' ,'Projects' ,'Blog' ,'Resume']
    const [data,setdata]=useState([])
    const [settleList,setSettleList]=useState([])
    const [unsettleList,setUnSettleList]=useState([])
    const [selected,setselected]=useState('')




    const removeObject = (objectIdToRemove) => {
      const indexToRemove = settleList.findIndex(obj => obj.id === objectIdToRemove.id);
      unsettleList.push(objectIdToRemove.id)
      if (indexToRemove !== -1) {
          const updatedArray = [...settleList];
          updatedArray.splice(indexToRemove, 1);
          setSettleList(updatedArray);
      }

      console.log("items",settleList)
  };


    const savedata=()=>{
      console.log("asdasdasdas",selected)
      
      const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
      for(const i of settleList){
        
        const selectedPostIndex = existingPosts.findIndex(post => post.id === i);
        // console.log("asdasdasdas",i)
        if(selectedPostIndex !== -1){
          existingPosts[selectedPostIndex].selected = true;
        }

      }



     
      for(const i of unsettleList){
        
        const selectedPostIndex2 = existingPosts.findIndex(post => post.id === i);
        // console.log("asdasdasdas",i)
        if(selectedPostIndex2 !== -1){
          existingPosts[selectedPostIndex2].selected = false;
        }

      }






      

      localStorage.setItem('posts', JSON.stringify(existingPosts));
       
    }

    useEffect(() => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        setdata(posts);
        const slectedtrueiitem=posts?.filter((n)=>n.selected === true)
        console.log("filtered",slectedtrueiitem)
        let dd=[]
        for(const i of slectedtrueiitem){
          console.log("sss",i)
          dd.push(i.id)
        }
        setSettleList(dd)


      }, [selected]);


  return (
    <div style={{width:'100%' ,height:'100vh',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column'}}>
            <div style={{backgroundColor:"whitesmoke",opacity:'80%',display:"flex",height:"4.5rem" ,
              width:'100%',justifyContent:'center',alignItems:'center' ,color:'#000'}} >
               
               
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

            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%',gap:'1%'}}>
                            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',height:'100%',width:'15%',backgroundColor:'whitesmoke',border:'1px solid #E9E9E9'}}>
                                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexDirection:'column',padding:"1rem 1rem",gap:'.7rem'}}>
                                    <span style={{cursor:'pointer' ,color:selected ==='writing'?'red':''}} className='hovertext' onClick={()=>setselected('writing')} >writing</span>
                                    <span style={{cursor:'pointer',color:selected ==='selected_work'?'red':''}} className='hovertext' onClick={()=>setselected('selected_work')}>selected work</span>
                                    <span style={{cursor:'pointer',color:selected ==='writing_post'?'red':''}} className='hovertext' onClick={()=>setselected('writing_post')}>Write post</span>
                                </div>
                            </div>

     <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'calc(100vh-4.5rem)',width:'85%',backgroundColor:'',overflow:'auto',padding:'2rem'}}>
                                  {(selected === 'selected_work' || selected === 'writing')? 
                                  <div style={{display:'flex',alignItems:'center' ,flexDirection:'column',width:"99%" ,height:'75%' ,backgroundColor:"",border:'1px solid #E9E9E9',gap:'2%'}}>

            <div style={{width:"100%",height:'2rem' ,backgroundColor:'#F2F2F2',display:"flex" ,justifyContent:'center',alignItems:'center' ,gap:'0%' ,fontSize:'12px'}}>
               <div style={{backgroundColor:'' ,width:'1rem' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center',paddingLeft:'30px'}}></div>
               <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'flex-start',alignItems:'center'}}>featured photo</div>
               <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'flex-start',alignItems:'center'}}>title</div>
               <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'flex-start',alignItems:'center'}}>description</div>
               <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center'}}>created time</div>
               <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center'}}>action</div>
            
                

            </div>

          <div  style={{width:"100%",height:'100%',overflow:'auto' ,backgroundColor:'' ,justifyContent:'center' ,alignItems:'center'}}>

            {data?.length > 0 ? data.map((item,index)=>{
                return(<>
             <div style={{width:"100%",height:'2rem' ,backgroundColor:'',display:"flex" ,justifyContent:'center',alignItems:'center' ,gap:'0%' ,fontSize:'12px'}}>

               <div 
               
               style={{backgroundColor:'' ,width:'1rem' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center',paddingLeft:'20px',padding:'1rem'}}><input type='checkbox' checked={ settleList.includes(item.id)?true :false}  
               
              //  onChange={(e) => {
              //   setSettleList(prevList => {
              //     if (e.target.checked) {
              //       return [...prevList, item.id]; // Add item.id to settleList
              //     } else {
              //       return prevList.filter(id => id !== item.id); // Remove item.id from settleList
              //     }
              //   });
              // }}

              onChange={(e) => {
                const itemId = item.id;
                if (e.target.checked) {
                  setSettleList(prevList => [...prevList, itemId]); // Add itemId to settleList
                } else {
                  unsettleList.push(item.id)
                  setSettleList(prevList => prevList.filter(id => id !== itemId)); // Remove itemId from settleList
                }
              }}
    
    />{index + 1}.</div>
               <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'flex-start',alignItems:'center'}}><img src={item?.featuredPhoto} style={{width:"44px",height:"24px"}}/></div>
               <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'flex-start',alignItems:'center'}}>{item?.title}</div>
               <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'flex-start',alignItems:'center',overflow: 'hidden',textOverflow: 'ellipsis', whiteSpace: 'nowrap',cursor:'auto'}} >{item?.description}</div>
               <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center',overflow: 'hidden',textOverflow: 'ellipsis', whiteSpace: 'nowrap',cursor:'auto'}} >{item?.created}</div>
               <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center',overflow: 'hidden',textOverflow: 'ellipsis', whiteSpace: 'nowrap',cursor:'auto',gap:'4px'}} > <button style={{backgroundColor:"red",color:'white'}} onClick={() => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      // Proceed with deletion
      console.log("Item deleted");
      // Add your logic to delete the item here
    }
  }}> delete</button> <button style={{backgroundColor:"blue",color:'white'}}> update</button>  </div>
             

            </div>

             <div style={{backgroundColor:'#F2F2F2' ,width:'98%' ,height:"1px" ,display:"flex" ,justifyContent:'center',alignItems:'center'}}></div>
             </> )
            }) : <div style={{width:"100%",height:'100%' ,backgroundColor:'',display:'flex' ,justifyContent:'center' ,alignItems:'center',color:'#826161'}} > history is empty !</div>}

        </div>  
        <button style={{backgroundColor:"#ed4949",color:'white'}} onClick={()=>savedata()}> save</button>

                                  </div>
                                  :
                                  
                                  selected === 'writing_post' ?<Writepost />:'' }

                            </div>

            </div>

           <style jsx>
            {`


.hovertext:hover{
    color:red;
    transition:all 300ms;
}

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

export default Dashboard