'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};



// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
// Move a piece from startStack to endStack
const movePiece = (startStack, endStack) => {
  let piece = stacks[startStack].pop()
  stacks[endStack].push(piece)
}



// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
// If startStack piece is smaller than the endStack piece move is legal 
// If endStack is empty then startStack piece can be moved to it 
const isLegal = (startStack, endStack) => {
  if (stacks[endStack].length === 0) {
    return true 
  } else if (stacks[startStack].slice(-1) < stacks[endStack].slice(-1)) {
    return true
  } else {
    return false
  }
}

// What is a win in Towers of Hanoi? When should this function run?
// Entire starting stack is moved to a different row, all 4 discs on different row, 
// if entire starting stack moved to either b or c 
const checkForWin = () => {
  return (stacks['b'].length === 4 || stacks['c'].length === 4) 
  }

// When is this function called? What should it do with its argument?
// If move is legal then movePiece, if move is not legal then game tells user its not legal
// If checkForWin is false then continue, if checkForWin is true then game tells user they won 
const towersOfHanoi = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {

    movePiece(startStack, endStack)

    if (checkForWin()){
      console.log('Congrats you won!')
    }

  } else {
    console.log('Move is not allowed')
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  // should start with all blocks in 1 row 
  // should make sure smallest is first one moved at start of game 
  // does game start 

  describe('#printStacks()', () => {
    it('should print out all stacks starting on a', () => {
      assert.deepEqual(stacks, { a: [4, 3, 2, 1], b: [], c: [] })
    })
  })
  
  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#printStacks()', () => {
    it('should print out all stacks', () => {
      console.log("a: " + stacks.a);
      console.log("b: " + stacks.b);
      console.log("c: " + stacks.c);
    })
  })



  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
