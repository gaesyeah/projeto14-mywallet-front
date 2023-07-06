import dayjs from "dayjs";
import { ListItemContainer, Value } from "../../pages/HomePage";

const Transactions = ({ transaction }) => {
  const {description, value, type, timeStamp} = transaction;

  return (
    <ListItemContainer>
      <div>
        <span>{dayjs(timeStamp).format('DD/MM')}</span>
        <strong>{description}</strong>
      </div>
      <Value type={type}>{value.toFixed(2).replace('.', ',')}</Value>
    </ListItemContainer>
  );
}

export default Transactions;