import {
  useBalance,
  useSendTransaction,
  useTomoUserInfo,
} from '@tomo-inc/tomo-telegram-sdk';
import { useState } from 'react';
import { parseUnits, zeroAddress } from 'viem';
import { useLoading } from '../hooks/useLoading';
// import TonWeb from 'tonweb';
export const mockTonChainId = 1100;
export const tonDecimals = 9;

const SendTONTransaction = () => {
  const [inputCount, setInputCount] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [msgHash, setMsgHash] = useState<string>('');
  const [txhash, setTxhash] = useState<string>('');
  const { tonAddress, tonPublicKey } = useTomoUserInfo();
  const { sendTonTransaction } = useSendTransaction();

  const [sendTONLoading, sendTONLoadingFn] = useLoading();

  const balance = useBalance({
    chainId: mockTonChainId,
  });

  const handleSendTONToken = () => {
    const memo = `${Date.now()}`;

    sendTONLoadingFn(async () => {
      await sendTonTransaction({
        fromAddress: `${tonAddress}`,
        publicKey: `${tonPublicKey}`,
        value: parseUnits(inputCount || '0', tonDecimals),
        toAddress: toAddress,
        memo: memo,
        token: {
          chainId: mockTonChainId,
          image:
            'https://assets.coingecko.com/coins/images/17980/standard/ton_symbol.png',
          name: 'Toncoin',
          symbol: 'TON',
          decimals: 9,
          address: zeroAddress,
        },
        mfaType: 'password',
        password: '1234',
      });
    });
  };

  const handleQueryTransaction = async () => {
    const txhashRes = '';
    setTxhash(txhashRes);
  };

  return (
    <div>
      <div>
        <div className={'module-title'}>SendTONTransaction</div>
        <div>
          <p>fromAddress: {tonAddress}</p>
          <p>balance: {balance.data?.formatted}</p>
          <p>
            toAddress:
            <input
              value={toAddress}
              type="text"
              onChange={(e) => setToAddress(e.target.value)}
            />
          </p>
          <p>
            value:
            <input
              value={inputCount}
              type="text"
              onChange={(e) => setInputCount(e.target.value)}
            />
          </p>
          <button disabled={sendTONLoading} onClick={handleSendTONToken}>
            {sendTONLoading ? 'Sending...' : 'Send TON Token'}
          </button>
        </div>
        <h3>getTransactionsByInMessageHash</h3>
        <div>
          <p>
            msgHash:
            <input
              value={msgHash}
              type="text"
              onChange={(e) => setMsgHash(e.target.value)}
            />
          </p>
          <p>
            tx hash: <span>{txhash}</span>
          </p>
          <button disabled={sendTONLoading} onClick={handleQueryTransaction}>
            {sendTONLoading ? 'Query...' : 'Query transactions'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendTONTransaction;
