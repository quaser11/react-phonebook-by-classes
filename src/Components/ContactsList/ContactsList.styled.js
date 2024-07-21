import styled from '@emotion/styled';

export const List = styled.ul`
    display:flex;
    flex-direction: column;
    gap:10px;
    list-style: none;
    width:300px;
    padding:0;
`;

export const Item = styled.li`
    display:flex;   
    align-items:center;
    padding:10px;
    border-radius:5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

export const Number = styled.span`
    margin-left:auto;
`

export const Delete = styled.button`
    height:20px;
    margin-left:10px;
    border:none;
    border-radius:3px;
    cursor:pointer
`