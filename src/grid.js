import React,{useState,useEffect} from 'react';
import Node from './Node';
import './grid.css';
import Astar from './algorithms/astar';
import dijkstra from './algorithms/dijkstra';
import dfs from './algorithms/dfs';
import bfs from './algorithms/bfs';
const rows=12;
const cols=35;
const NODE_START_ROW=0;
const NODE_START_COL=0;
const NODE_END_ROW=rows-1;
// const NODE_END_ROW=3;
const NODE_END_COL=cols-1;
// const NODE_END_COL=3;


const PathFind=()=>{
    const [grid,setGrid]=useState([]); 
    const [Path,setPath]=useState([]); 
    const [visitedNodes,setVisitedNodes]=useState([]);
    useEffect(()=>{ 
        initialGrid();
    },[])
    //CREATING THE GRID
    const initialGrid=()=>{
        // const grid=new Array(cols);
        const grid=new Array();
        for (let i=0;i<rows;i++){
            grid[i]=new Array(cols); 

        }
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                grid[i][j]=new Spot(i,j);
            }
            setGrid(grid);
        }
        addNeighbours(grid);
        
        const startNode=grid[NODE_START_ROW][NODE_START_COL];
        const endNode=grid[NODE_END_ROW][NODE_END_COL];
        startNode.isWall=false;
        endNode.isWall=false;

        document.getElementById('grid').addEventListener('click', function(e){
            var target=e.target;
            if(target.id==='3')
            visualizeDijkstra(grid,startNode,endNode);
            else if(target.id==='4')
            visualizeA(startNode,endNode);
            else if(target.id==='2')
            visualizeDFS(grid,startNode,endNode);
            else if(target.id==='1')
            visualizeBFS(grid,startNode,endNode);
        },false);
        
    };

//BFS
const visualizeBFS=(grid,startNode,endNode)=>{
    let path=bfs(grid,startNode,endNode);
    setPath(path.path);
    setVisitedNodes(path.visitedNodes); 
}


//A*
const visualizeA=(startNode,endNode)=>{
    let path=Astar(startNode,endNode);
    setPath(path.path);
    setVisitedNodes(path.visitedNodes); 
}

//DFS
const visualizeDFS=(grid,startNode,endNode)=>{
    let path=dfs(grid,startNode,endNode);
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);
}

//DIJKSTRA
const visualizeDijkstra=(grid,startNode,endNode)=>{
    let path=dijkstra(grid,startNode,endNode);
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);

}



//add neighbours
const addNeighbours=(grid)=>{
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            grid[i][j].addNeighbours(grid);
        }

    }
}


//THE SPOT
function Spot(i,j){
    this.x=i;
    this.y=j;
    this.isStart=this.x===NODE_START_ROW && this.y===NODE_START_COL;
    this.isEnd=this.x===NODE_END_ROW && this.y===NODE_END_COL;
    this.g=0;
    this.f=0;
    this.h=0;
    this.distance= Infinity;
    this.neighbours=[];
    this.isVisited=false;
    this.isWall=false;
    this.isWeight=false;
    if(Math.random(1)<0.1){
        this.isWall=true;
    }
    this.previous=null;
    this.parent=null;
    this.addNeighbours= function(grid)
    {
        let i=this.x;
        let j=this.y;

        if(i>0) this.neighbours.push(grid[i-1][j]);
        if(i<rows-1) this.neighbours.push(grid[i+1][j]);
        if(j>0) this.neighbours.push(grid[i][j-1]);
        if(j<cols-1) this.neighbours.push(grid[i][j+1]);
    };

} 
// //GRID WITH SPOTS
const gridWithNode=(
    <div>
        {grid.map((row, rowIndex)=>{
            return(
            <div key={rowIndex} className='row'>
                {row.map((col, colIndex)=>{
                    const{ isStart, isEnd, isWall, isWeight,isVisited, }=col;
                    return (
                        <Node 
                        key={colIndex} 
                        isStart={isStart} 
                        isEnd={isEnd} 
                        row={rowIndex} 
                        col={colIndex}
                        isWall={isWall}
                        isWeight={isWeight}
                        isVisited={isVisited}
                        />
                    )
                })}

            </div>
            )
        })}
    </div> 
);
const visualizeShorthestPath=(shorthestPathNodes)=>{
   for(let i=0;i<shorthestPathNodes.length;i++){
       setTimeout(()=>{
           const node=shorthestPathNodes[i];
            document.getElementById(`node-${node.x}-${node.y}`).className='node node-shorthest-path';
       }, 200*i);
   } 
}
//A*
const visualizePathAstar=()=>{
    // console.log('visualize path');
       for(let i=0;i<=visitedNodes.length;i++){
       if(i===visitedNodes.length){
        setTimeout(()=>{
        visualizeShorthestPath(Path);
       }, 30*i);
    }
    else{
        setTimeout(()=>{
        const node=visitedNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className='node node-visited';
        },20*i);
   }
    }
}
//DFS
const visualizePathDFS=()=>{
    // console.log('visualize path');
       for(let i=0;i<=visitedNodes.length;i++){
       if(i===visitedNodes.length){
        setTimeout(()=>{
        visualizeShorthestPath(Path);
       }, 30*i);
    }
    else{
        setTimeout(()=>{
        const node=visitedNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className='node node-visited';
        },20*i);
   }
    }
}
//BFS
const visualizePathBFS=()=>{
       for(let i=0;i<=visitedNodes.length;i++){
       if(i===visitedNodes.length){
        setTimeout(()=>{
        visualizeShorthestPath(Path);
       }, 30*i);
    }
    else{
        setTimeout(()=>{
        const node=visitedNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className='node node-visited';
        },20*i);
   }
    }
}
//DIJKSTRA
const visualizePathDijkstra=()=>{
       for(let i=0;i<=visitedNodes.length;i++){
       if(i===visitedNodes.length){
        setTimeout(()=>{
        visualizeShorthestPath(Path);
       }, 30*i);
    }
    else{
        setTimeout(()=>{
        const node=visitedNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className='node node-visited';
        },20*i);
   }
    }
}
// CLEAR WALLS
const clearWalls=()=>{
for(let i=0;i<grid.length;i++){
    for(let j=0;j<grid[0].length;j++){
        let cell=grid[i][j];
        if(cell.isWall){
            const node=cell;
            node.isWall=false;
            document.getElementById(`node-${node.x}-${node.y}`).className='node node';
            console.log(cell);
        }
        }
    }
}

// CLEAR BOARD

const clearBoard=()=>{
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            let cell=grid[i][j];
            if(cell.isWall){
                const node=cell;
                node.isVisited=true;
                document.getElementById(`node-${node.x}-${node.y}`).className='node node';
            }
            if(cell.isVisited && (!cell.isStart && !cell.isEnd)){
                const node=cell;
                node.isVisited=false;
                node.distance=Infinity;
                document.getElementById(`node-${node.x}-${node.y}`).className='node node';
            }
            if(cell.isStart)
            {
                const node=cell;
                node.isVisited=true;
                node.distance=0;
                document.getElementById(`node-${node.x}-${node.y}`).className='node node-start';
            }
            if(cell.isEnd)
            {
                const node=cell;
                node.isVisited=false;
                node.distance=Infinity;
                document.getElementById(`node-${node.x}-${node.y}`).className='node node-end';
            }
        }
    }
}

//CLEAR PATH

const clearPath=()=>{
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            let cell=grid[i][j];
          if(cell.isVisited && (!cell.isStart && !cell.isEnd)){
                const node=cell;
                node.previous=null;
                node.isVisited=false;
                node.distance=Infinity;
                document.getElementById(`node-${node.x}-${node.y}`).className='node node';
            }
             if(cell.isStart)
            {
                const node=cell;
                node.previous=null;
                node.isVisited=false;
                node.distance=0;
                document.getElementById(`node-${node.x}-${node.y}`).className='node node-start';
            }
            if(cell.isEnd)
            {
                const node=cell;
                node.previous=null;
                node.isVisited=false;
                node.distance=Infinity;
                document.getElementById(`node-${node.x}-${node.y}`).className='node node-end';
            }

        }}
}


return(
    <div class='main' id='grid'>
        {/* <button type='button' class='button' onClick={clearWalls}>Clear walls</button> */}
        {/* <button type='button' class='button' onClick={clearBoard}>Clear board</button> */}
        <button type='button' class='button' id='1' onClick={visualizePathBFS}>BFS</button> 
        <button type='button' class='button' id='2' onClick={visualizePathDFS}>DFS</button> 
        <button type='button' class='button' id='3' onClick={visualizePathDijkstra}>Dijkstra</button> 
        <button type='button'class='button' id='4' onClick={visualizePathAstar} >A*</button>
        {/* <button type='button' class='clear' onClick={clearPath} >Clear path</button> */} 
        <button type='button' class='clear' onClick={clearPath}>CLEAR PATH</button>
        <button type='button' class='clear' onClick={clearPath}>NEW WALLS</button>
        {gridWithNode}
    </div>
)
}

export default PathFind; 