document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const scoreDisplay = document.querySelector("#score")
    const width = 8
    const squares = []
    let score = 0

    const candyColors = [
        "url(src/images/red-candy.png)",
        "url(src/images/yellow-candy.png)",
        "url(src/images/orange-candy.png)",
        "url(src/images/purple-candy.png)",
        "url(src/images/green-candy.png)",
        "url(src/images/blue-candy.png)"
    ]


    //create the board
    function createBoard(){
        for (let i = 0; i < width*width; ++i){
            const square = document.createElement("div")
            square.setAttribute("id", i)
            square.setAttribute("draggable", true) // to make the element draggable
            let randomColor = Math.floor(Math.random()* candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

    //drag the candies
    //the five stages of dragging

    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener("dragstart", dragStart))
    squares.forEach(square => square.addEventListener("dragend", dragEnd))
    squares.forEach(square => square.addEventListener("dragover", dragOver))
    squares.forEach(square => square.addEventListener("dragenter", dragEnter))
    squares.forEach(square => square.addEventListener("dragleave", dragLeave))
    squares.forEach(square => square.addEventListener("drop", dragDrop))

    function dragStart(){
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id) //parseInt just like parse float, to make sure to get an integer

    }

    function dragOver(event){
        event.preventDefault()// we do this to make it not require an action when we drag over, this function can be designed differently if you do want something to hapen
    }

    function dragEnter(event){
        event.preventDefault()
    }

    function dragLeave(){

    }

    function dragDrop(){
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }
    
    function dragEnd(){
        //can only drag and drop on valid moves
        let validMoves = [
            squareIdBeingDragged-1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ]

        let validMove = validMoves.includes(squareIdBeingReplaced)

        if (squareIdBeingReplaced && validMove){
            squareIdBeingReplaced = null
        }
        else if (squareIdBeingReplaced && !validMove){
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        }
        else {
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        }
    }

    //drop down candies once have been cleared
    function moveDown(){
        for (let i = 0; i <= 55; ++i){
            if (squares[i+width].style.backgroundImage === "" || squares[i].style.backgroundImage === ""){
                squares[i+width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ""
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFisrtRow = firstRow.includes(i)
                if (isFisrtRow  ){
                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundImage = candyColors[randomColor]
                }
            }
        }
    }


    //checking for matches
    //check for 3 in row
    function checkRowForThree(){
        for (let i = 0; i <= 61; ++i){//61 because thats the last possible index for a matching row of 3
            let rowOfThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]

            if (notValid.includes(i)) continue

            if (rowOfThree.every( index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 3
                scoreDisplay.textContent = score
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ""
                })
            }
        }
    }

    //check for column of 3
    function checkColumnForThree(){
        for (let i = 0; i <= 47; ++i){//47 because thats the last possible index for a matching column of 3
            let columnOfThree = [i, i+width, i+2*width]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            if (columnOfThree.every( index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 3
                scoreDisplay.textContent = score
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ""
                })
            }
        }
    }



    //check for 4 in row
    function checkRowForFour(){
        for (let i = 0; i <= 60; ++i){//61 because thats the last possible index for a matching row of 3
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]

            if (notValid.includes(i)) continue

            if (rowOfFour.every( index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 4
                scoreDisplay.textContent = score
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ""
                })
            }
        }
    }

    //check for column of 4
    function checkColumnForFour(){
        for (let i = 0; i <= 39; ++i){//47 because thats the last possible index for a matching column of 3
            let columnOfFour = [i, i+width, i+2*width, i+3*width]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            if (columnOfFour.every( index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 4
                scoreDisplay.textContent = score
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ""
                })
            }
        }
    }




    //check for 5 in row
    function checkRowForFive(){
        for (let i = 0; i <= 59; ++i){//61 because thats the last possible index for a matching row of 3
            let rowOfFive = [i, i+1, i+2, i+3, i+4]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]

            if (notValid.includes(i)) continue

            if (rowOfFive.every( index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 5
                scoreDisplay.textContent = score
                rowOfFive.forEach(index => {
                    squares[index].style.backgroundImage = ""
                })
            }
        }
    }




    //check for column of 5
    function checkColumnForFive(){
        for (let i = 0; i <= 31; ++i){//47 because thats the last possible index for a matching column of 3
            let columnOfFive = [i, i+width, i+2*width, i+3*width, i+4*width]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            if (columnOfFive.every( index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 5
                scoreDisplay.textContent = score
                columnOfFive.forEach(index => {
                    squares[index].style.backgroundImage = ""
                })
            }
        }
    }


    moveDown()
    checkColumnForFive()
    checkRowForFive()
    checkColumnForFour()
    checkRowForFour()
    checkRowForThree()
    checkColumnForThree()

    window.setInterval(function(){//well this is sort of like making it continuously invoke the function the whole time until the browser is closed
        moveDown()
        checkColumnForFive()
        checkRowForFive()
        checkColumnForFour()
        checkRowForFour()
        checkColumnForThree()
        checkRowForThree()
    }, 100)
    





})