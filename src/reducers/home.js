import {
  HOME_CONNECT_WALLET_BEGIN,
  HOME_CONNECT_WALLET_SUCCESS,
  HOME_CONNECT_WALLET_FAILURE,
  HOME_ACCOUNTS_CHANGED,
  HOME_NETWORK_CHANGED,

	HOME_DISCONNECT_WALLET_BEGIN,
	HOME_DISCONNECT_WALLET_SUCCESS,
	HOME_DISCONNECT_WALLET_FAILURE
} from '../actions/constants';

const initialState = {
	address: '',
	web3: null,
	connected: false,
	networkId: Number(process.env.REACT_APP_NETWORK_ID),
	connectWalletPending: false,
	disconnectWalletPending: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case HOME_CONNECT_WALLET_BEGIN:
			return {
				...state,
				connectWalletPending: true,
			};

		case HOME_CONNECT_WALLET_SUCCESS:
			return {
				...state,
				web3: action.data.web3,
				address: process.env.ACCOUNT ? process.env.ACCOUNT : action.data.address,
				networkId: action.data.networkId,
				connected: true,
				connectWalletPending: false,
			};

		case HOME_NETWORK_CHANGED:
			return {
				...state,
				networkId: action.data,
			};

		case HOME_ACCOUNTS_CHANGED:
			return {
				...state,
				address: action.data,
			};

		case HOME_CONNECT_WALLET_FAILURE:
			return {
				...state,
				connectWalletPending: false,
			};
		
		case HOME_DISCONNECT_WALLET_BEGIN:
			return {
				...state,
				disconnectWalletPending: true,
			};

		case HOME_DISCONNECT_WALLET_SUCCESS:
			return {
				...state,
				address: '',
				web3: null,
				connected: false,
				disconnectWalletPending: false,
			};

		case HOME_DISCONNECT_WALLET_FAILURE:
			return {
				...state,
				web3: null,
				address: '',
				disconnectWalletPending: false,
			};

		default:
			return state;
	}
}
