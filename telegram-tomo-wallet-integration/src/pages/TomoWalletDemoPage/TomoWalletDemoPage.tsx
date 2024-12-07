import { TomoProvider } from '@tomo-inc/tomo-telegram-sdk';
import '@tomo-inc/tomo-telegram-sdk/dist/styles.css';
import { ReactElement, useState } from 'react';

import Balance from '@/components/Balance';
import BiomerticActions from '@/components/BiometricActions';
import Mfa from '@/components/Mfa';
import OnRamp from '@/components/OnRamp';
import SendEVMTransaction from '@/components/SendEVMTransaction';
import SendTONTransaction from '@/components/SendTONTransaction';
import SwapTokens from '@/components/SwapTokens';
import TelegramActions from '@/components/TelegramActions';
import TradePassword from '@/components/TradePassword';
import Transactions from '@/components/Transactions';
import UserInfoActions from '@/components/UserInfoActions';

import './TomoWalletDemoPage.css';

export default function TomoWalletDemoPage() {
  // Component Mapping
  const componentMap: Record<string, ReactElement> = {
    BiomerticActions: <BiomerticActions />,
    Mfa: <Mfa />,
    SendEVMTransaction: <SendEVMTransaction />,
    SendTONTransaction: <SendTONTransaction />,
    Transactions: <Transactions />,
    Balance: <Balance />,
    SwapTokens: <SwapTokens />,
    OnRamp: <OnRamp />,
    TradePassword: <TradePassword />,
  };

  const actionList = Object.keys(componentMap);

  const [action, setAction] = useState(actionList[0]);

  return (
    <div className="container">
      <TomoProvider env="test">
        {/* Initial Data Section */}
        <section className="init-data">
          <h2>Initialize Data</h2>
          <TelegramActions />
          <br />
          <UserInfoActions />
        </section>

        {/* Action Section */}
        <section className="action-container">
          <h2>Perform Actions</h2>
          <label htmlFor="action-select" className="label">
            Select an Action:
          </label>
          <select
            id="action-select"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="select"
          >
            {actionList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </section>

        {/* Render the selected component */}
        {componentMap[action]}

        <footer className="footer"></footer>
      </TomoProvider>
    </div>
  );
}
