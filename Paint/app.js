const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const btnmode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const figureBtn = document.getElementById("jsFigure");

const DEFAULT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

/*캔버스의 사이즈*/
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

/*캔버스의 배경색을 하얀색으로 설정(배경색을 바꾸지 않고 저장을 하면 배경이 투명색으로 저장되기 때문)*/
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

/*선의 색과 굵기(default)*/
ctx.strokeStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

ctx.fillStyle = DEFAULT_COLOR;

let painting = false;
let filling = false;

let fillRectangle = true;
let strokeRectangle = true;

function stopPainting()
{
    painting = false; //그려지지 않음
}

function startPainting()
{
    painting = true; //그려짐
}

function onMouseMove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting) //마우스를 누르지 않거나 캔버스를 벗어났을 때
    {
        /*마우스가 움직이면서 선(path)을 만들고 있지만 painting = false 이므로 보이지 않음*/
        //console.log(x, y, "에 path 생성");
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else //마우스를 누르고 드래그할 때
    {
        //console.log(x, y, "에 line 생성");
        ctx.lineTo(x, y);
        ctx.stroke(); //선을 그음(보이게 함)
    }
}

function clickColor(event)
{
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange(event)
{
    const size = event.target.value;
    ctx.lineWidth = size;
}

function clickMode()
{
    if(filling === true)
    {
        filling = false;
        btnmode.innerText = "Fill";
    }
    else
    {
        filling = true;
        btnmode.innerText = "Paint";
    }
}

function clickCanvas(event)
{
    if(filling)
    {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //x, y, 가로, 세로
    }
}

function rightClick(event)
{
    event.preventDefault(); //우클릭을 했을 때 메뉴가 나오지 않게 함
}

function clickSaveBtn()
{
    const image = canvas.toDataURL();
    const link = document.createElement("a"); //a : anchor
    link.href = image; //URL
    link.download = "PaintJS";
    link.click();
}

function clickFigure()
{
    if(fillRectangle === true)
    {
        fillRectangle = false;
        strokeRectangle = true;

        figureBtn.innerText = "Rect(□)";
    }
    else if(strokeRectangle === true)
    {
        strokeRectangle = false;
        fillRectangle = true;

        figureBtn.innerText = "Rect(■)";
    }
}

function figure(click)
{
    const x = event.offsetX;
    const y = event.offsetY;

    if(fillRectangle === false && strokeRectangle === true)
    {
        ctx.fillRect(x, y, 50, 50);
    }
    else if(strokeRectangle === false && fillRectangle === true)
    {
        ctx.strokeRect(x, y, 50, 50);
    }
} 

if(canvas)
{
    canvas.addEventListener("mousemove", onMouseMove); //마우스를 움직일 때
    canvas.addEventListener("mousedown", startPainting); //마우스를 눌렀을 때
    canvas.addEventListener("mouseup", stopPainting); //마우스를 누르지 않을 때
    canvas.addEventListener("mouseleave", stopPainting); //마우스가 캔버스를 벗어닜을 때
    canvas.addEventListener("click", clickCanvas); //캔버스를 클릭했을 때
    canvas.addEventListener("contextmenu", rightClick); //우클릭을 했을 때 나오는 메뉴(저장, 복사)
    canvas.addEventListener("click", figure);
}

Array.from(colors).forEach(color => color.addEventListener("click", clickColor));

if(range)
{
    range.addEventListener("input", changeRange);
}

if(btnmode)
{
    btnmode.addEventListener("click", clickMode);
}

if(saveBtn)
{
    saveBtn.addEventListener("click", clickSaveBtn);
}

if(figureBtn)
{
    figureBtn.addEventListener("click", clickFigure);
}