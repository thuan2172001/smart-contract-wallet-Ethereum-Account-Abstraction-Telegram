
# TomoWallet Telegram POC

This is a Proof of Concept (POC) for integrating the **Tomo Telegram SDK** into a Telegram-based application, allowing users to connect their **Tomo Wallet** seamlessly via Telegram.

The Tomo Telegram SDK provides a secure and efficient wallet experience, where users can access their wallet and sign transactions directly within Telegram apps.

## Features
1. **Tomo Telegram Wallet**: One-click connection for users to access their Tomo wallet using their Telegram account.
2. **Multi-Wallet Support**: Supports additional wallets such as OKX, Bitget, and TON Connect.
3. **Secure Transaction Signing**: Users can authenticate and sign transactions securely using the Tomo Telegram SDK.
4. **EVM Chains Support**: Enable interaction with Ethereum-based networks and other EVM-compatible chains.
5. **Simple Modal Integration**: Provides an easy-to-use modal for connecting to wallets and triggering actions.

## Architecture Overview

The Tomo Telegram SDK is a universal wallet solution that integrates seamlessly with Telegram applications. It enables users to create, manage, and sign transactions using their Telegram account, leveraging a secure wallet environment.

- **Tomo Telegram Wallet SDK**: A comprehensive solution to manage wallet creation and transaction signing directly within Telegram applications.
- **Authentication Flow**: The Tomo SDK facilitates secure transaction signing by interacting with the wallet via Telegram, requiring users to authenticate with their pay pin to authorize transactions.

## Key Components

### 1. **TomoProvider**

The `TomoProvider` component connects the Telegram user to their Tomo wallet, initializing the wallet and enabling interaction with the Telegram app. It also manages different wallet providers (e.g., OKX, TON Connect).

### 2. **TelegramActions and UserInfoActions**

These components initialize necessary user data and manage the authentication process, prompting users to log in and set up their wallet.

### 3. **Action Selection**

Once the user has been authenticated, they can select and perform various actions related to their wallet using the `action-select` dropdown. This includes actions such as viewing balance, sending transactions, etc.

### 4. **Transaction Signing**

To perform transactions, the app queries the Tomo SDK, prompting the wallet to sign the transaction. The user will authenticate with their pay pin before confirming the transaction.

## Usage

### 1. **Setup Tomo Provider**

In the main app file, use the `TomoProvider` component to establish a connection between the user's Telegram account and the Tomo wallet.

```js
import { TomoProvider } from '@tomo-inc/tomo-telegram-sdk';

<TomoProvider theme="light" supportedProviders={['EVM']} manifestUrl="https://d8o5s6z018yzr.cloudfront.net/manifestUrl.json">
  <YourApp />
</TomoProvider>
```

### 2. **Integrate Actions**

Use the `TelegramActions` and `UserInfoActions` components to initialize data and prompt users to log in to their wallets.

```js
<TelegramActions />
<UserInfoActions />
```

### 3. **Select and Perform Actions**

Users can choose an action from the dropdown list (`action-select`), and the corresponding component will be rendered.

```js
<select id="action-select" value={action} onChange={(e) => setAction(e.target.value)}>
  {actionList.map((item) => (
    <option key={item} value={item}>{item}</option>
  ))}
</select>
```

### 4. **Authenticate Transactions**

When a transaction needs to be signed, the app will query the Tomo SDK to trigger the wallet and request user authentication via the pay pin.

```js
// Querying the Tomo SDK for signing a transaction
await tomo_wallet.signTransaction(transactionDetails);
```

## Demo Bot

You can interact with the original demo bot of Tomo Inc., [@AlvinsDemoBot](https://t.me/AlvinsDemoBot), to explore the basic features of the Tomo Telegram SDK Wallet. The bot demonstrates wallet connection, transaction signing, and secure authentication via the pay pin.

## Documentation

For more detailed information about the Tomo Telegram SDK, including wallet creation, transaction signing process, and the integration of additional wallets like OKX, Bitget, and TON Connect, please refer to the official [Tomo Telegram SDK Documentation](insert-link).
