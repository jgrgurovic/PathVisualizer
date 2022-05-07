import React from 'react';
import {Grid} from '@mui/material';
import slozenostSlika from './images/slozenost.png'
import okvirSlozenost from './images/slozenostPrimjer.png'
import './primjer.css'
const Slozenost=()=>{
    return(
        <div class="primjer">
         <img src={slozenostSlika} style={{marginLeft:'auto',marginRight:'auto',marginTop:'2rem',marginBottom:'4rem',display: 'block',width:'100%', }}/>
           <Grid container spacing={4} direction="row" >
        <Grid item xs={6} >
                    <h5 style={{marginLeft:'2rem'}}>Rekurzija DFS algoritma se implementira uporabom stoga, pri čemu će svaki čvor grafa biti označen ako posjećen ili neposjećen. Implementacija može biti opisana na sljedeći način:
                        1. Odabere se početni čvor te se stave njegovi susjedi na vrh stoga 
                        2. Skida se čvor sa vrha stoga te ga se stavlja u listu posjećenih čvorova
                        3. Susjedi tog čvora koji se ne nalaze u listi posjećenih čvorova potom se stavljaju na vrh stoga 
                        4. Ponavlja se 2. i 3. korak dok stog ne bude prazan</h5>
        </Grid>
        <Grid item xs={6} >
                    <img src={okvirSlozenost} style={{marginLeft:'5rem'}}/>
        </Grid>

    </Grid>


        </div>

)}

export default Slozenost;