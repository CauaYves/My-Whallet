import styled from "styled-components"

export default function ListItem(props) {
    const { date, description, value, type } = props.data

    return (<ListItemContainers>
        <div>
            <span>{date}</span>
            <strong>{description}</strong>
        </div>
        <Value type={type}>{value}</Value>
    </ListItemContainers>)
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${({type}) => (type === "+" ? "green" : "red")};
`
const ListItemContainers = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
