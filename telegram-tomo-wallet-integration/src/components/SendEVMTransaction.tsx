import {
  useSendTransaction,
  useTomoUserInfo,
} from '@tomo-inc/tomo-telegram-sdk';
import { useState } from 'react';
import { parseUnits, zeroAddress } from 'viem';
import { sepolia } from 'viem/chains';
import { useConfig } from 'wagmi';
import { useLoading } from '../hooks/useLoading';

const SendEVMTransaction = () => {
  const [inputCount, setInputCount] = useState<string>();
  const [toAddress, setToAddress] = useState<string>();
  const config = useConfig();
  const { evmAddress } = useTomoUserInfo();
  const { sendEVMTransaction } = useSendTransaction();

  const [sendEVMBiometryLoading, sendEVMLoadingBiometryFn] = useLoading();
  const [sendEVMPasswordLoading, sendEVMLoadingPasswordFn] = useLoading();

  const handleSendEVMBiometry = () => {
    sendEVMLoadingBiometryFn(async () => {
      await sendEVMTransaction({
        chainId: sepolia.id,
        fromAddress: evmAddress,
        toAddress: toAddress,
        value: parseUnits(inputCount || '0', 18),
        config,
        tokenValue: parseUnits(inputCount || '0', 18),
        token: {
          chainId: sepolia.id,
          image: 'https://etherscan.io/images/main/empty-token.png',
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
          address: zeroAddress,
        },
      });
    });
  };

  const handleSendEVMPassword = () => {
    const password = prompt('Please enter your password');
    if (!password) return;
    sendEVMLoadingPasswordFn(async () => {
      await sendEVMTransaction({
        chainId: sepolia.id,
        fromAddress: evmAddress,
        toAddress: toAddress,
        value: parseUnits(inputCount || '0', 18),
        // rpc: sepolia.rpcUrls.default.http[0],
        config,
        tokenValue: parseUnits(inputCount || '0', 18),
        token: {
          chainId: sepolia.id,
          image: 'https://etherscan.io/images/main/empty-token.png',
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
          address: zeroAddress,
        },

        mfaType: 'password',
        password: password,
      });
    });
  };
  return (
    <div>
      <div>
        <div className={'module-title'}>SendEVMTransaction</div>
        <div>
          <p>fromAddress: {evmAddress}</p>
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
          <button
            disabled={sendEVMBiometryLoading}
            onClick={handleSendEVMBiometry}
          >
            {sendEVMBiometryLoading ? 'Sending...' : 'Send EVM Token Biometry'}
          </button>
          <button
            disabled={sendEVMPasswordLoading}
            onClick={handleSendEVMPassword}
          >
            {sendEVMPasswordLoading ? 'Sending...' : 'Send EVM Token Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendEVMTransaction;
