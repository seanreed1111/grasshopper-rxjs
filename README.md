# grasshopper-rxjs
RxJS version of the Grasshopper
===============================

HOW DO I PLAY THIS GAME?
========================
Grasshopper is a puzzle game where you start off with  
1)four grasshoppers on the left side (the "L"-type grasshoppers), and  
2)four grasshoppers on the right side (the "R"-type grasshoppers), and  
3)one blank space in the middle.  

The goal of the puzzle is to switch the grasshoppers to the opposite side.  

For example, if we represent the starting position as:  

`L L L L * R R R R`  
`1 2 3 4 5 6 7 8 9`  

(Note: position 5, the *, is initially the blank space)  

Then the *winning* position reverses the "L"s and "R"s:  

`R R R R * L L L L`  
`1 2 3 4 5 6 7 8 9`  


HOW DO THE GRASSHOPPERS MOVE?
=============================
When you CLICK on a grasshopper with your mouse it will move if it can!  

Each grasshopper can only move one of two ways  
A) Jump over one adjacent grasshopper (of any type) into the blank space, or,  
B) move one space into the blank space.  



For example, if we again represent the *starting* position as:  

`L L L L * R R R R`  
`1 2 3 4 5 6 7 8 9`  



There are only *four* possible valid moves from this starting position:  

Either Position 4 MOVES TO Position 5..  
---------------------------------------
`L L L * L R R R R`  
`1 2 3 4 5 6 7 8 9`  


OR Position 6 MOVES TO Position 5..
---------------------------------------
`L L L L R * R R R`  
`1 2 3 4 5 6 7 8 9`  



OR Position 3 JUMPS TO Position 5..
---------------------------------------
`L L * L L R R R R`  
`1 2 3 4 5 6 7 8 9`   



OR Position 7 JUMPS TO Position 5..
---------------------------------------
`L L L L R R * R R`  
`1 2 3 4 5 6 7 8 9`   


Does that make sense? 

If it does, good luck playing Grasshopper!  
After you play it, try to make the game yourself for practice!  
Maybe add in a timer, or a counter that keeps track of the number of moves you've made to spice it up a bit.
