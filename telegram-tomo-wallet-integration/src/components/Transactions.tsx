import { IChainId, useTransactions } from '@tomo-inc/tomo-telegram-sdk';
import { formatUnits } from 'viem';

const Transactions = () => {
  const { transactions } = useTransactions();

  const transactionsRender = Object.keys(transactions)
    .map((key) => {
      const intKey = Number(key) as IChainId;
      return transactions[intKey];
    })
    .filter((item) => !!item)
    .flat()
    .sort((a, b) => {
      return b.time - a.time;
    });

  return (
    <div>
      <div className={'module-title'}>History</div>
      {transactionsRender.map((item) => {
        return (
          <p style={{ marginBottom: 16 }} key={item.time}>
            <p>
              <span style={{ marginRight: 16 }}>{item.chainId}</span>
              <span>{item.hash}</span>
            </p>
            <p>
              <span style={{ marginRight: 16 }}>from:{item.fromAddress}</span>
              <span>to:{item.toAddress}</span>
            </p>
            <p>
              <span>
                amount:{' '}
                {formatUnits(
                  BigInt(item.toAmount),
                  item.toSwapTokens?.decimals || 18
                )}{' '}
                {` ${item.toSwapTokens?.symbol}`}
              </span>
            </p>
          </p>
        );
      })}
    </div>
  );
};

export default Transactions;
