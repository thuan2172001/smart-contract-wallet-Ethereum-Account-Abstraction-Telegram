import { useChains } from '@tomo-inc/tomo-telegram-sdk';

const Chains = () => {
  const { chains } = useChains();

  return (
    <div>
      <h2>Chains</h2>
      <select name={chains[0].name}>
        {chains.map((chain, index) => {
          return (
            <option key={index + chain.name} value={chain.name}>
              {chain.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Chains;
