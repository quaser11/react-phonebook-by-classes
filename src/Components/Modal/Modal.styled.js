import styled from "@emotion/styled";

export const Backdrop = styled.div`
    position:absolute;
    top:0;
    min-width:100vw;
    min-height:100%;
    background-color: transparent;   
`

export const BackdropModal = styled.div`
    position:absolute;
    display:flex;
    align-items:center;
    top:${props => props.top}px;
    left:${props => props.left + props.left / 4}px;
    width:300px;
    height:30px;
    padding:10px;
    border:1px solid black;
    border-radius:10px;
    transform:translate(-50%,-50%);
    background-color:white;
`