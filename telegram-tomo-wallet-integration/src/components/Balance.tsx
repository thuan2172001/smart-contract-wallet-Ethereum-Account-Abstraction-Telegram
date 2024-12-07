import { useBalance } from '@tomo-inc/tomo-telegram-sdk';
import { sepolia } from 'viem/chains';

const Balance = () => {
  const balance = useBalance({ chainId: sepolia.id });
  return (
    <div>
      <div className={'module-title'}>Balance</div>
      <p>chain: {sepolia.name}</p>
      <p>
        balance: {balance.data?.formatted} {balance.data?.symbol}
      </p>
    </div>
  );
};

export default Balance;
