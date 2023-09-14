
export default function SliderOwn(){
    return(
<div id="carouselExampleDark" class="carousel slide carousel-fade" data-bs-ride="carousel">

  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" aria-current="true"   class="active"  aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="5" aria-label="Slide 6"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="6" aria-label="Slide 7"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="7" aria-label="Slide 8"></button>
  </div>

  <div class="carousel-inner" style={{display:'flex',alignItems:'center'}}>

    <div class="carousel-item active" data-bs-interval="300" >
        <img src="/assets/slide6.jpg" style={{width:'100vw',height:'50vh'}} />
      <div class="carousel-caption d-none d-md-block">
      
      </div>
    </div>
   

    <div class="carousel-item " data-bs-interval="300" >
    <img src="/assets/slide3.jpg" style={{width:'100vw',height:'50vh'}}/>

      <div class="carousel-caption d-none d-md-block">
  
      </div>
    </div>

    <div class="carousel-item " data-bs-interval="300">
    
    <img src="/assets/slide4.jpg" style={{width:'100vw',height:'50vh'}}/>

      <div class="carousel-caption d-none d-md-block">
   
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="300">
    
    <img src="/assets/slide5.jpg" style={{width:'100vw',height:'50vh'}}/>

      <div class="carousel-caption d-none d-md-block">
    
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="300">
    
    <img src="/assets/slide7.jpg" style={{width:'100vw',height:'50vh'}}/>

      <div class="carousel-caption d-none d-md-block">
    
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="300">
    
    <img src="/assets/slide8.jpg" style={{width:'100vw',height:'50vh'}}/>

      <div class="carousel-caption d-none d-md-block">
    
      </div>
    </div>

    <div class="carousel-item " data-bs-interval="300">
    
    <img src="/assets/slide6.jpg" style={{width:'100vw',height:'50vh'}}/>

      <div class="carousel-caption d-none d-md-block">

      </div>
    </div>

  </div>

  


  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    )
}


