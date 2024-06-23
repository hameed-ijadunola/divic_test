import { Alert } from 'react-native';
import { Toast } from 'react-native-toast-notifications';

interface CustomFetchQueryProps {
  api: (props: any) => Promise<any>;
  apiProps?: any;
  handleSuccess?: (data: any) => void;
  handleError?: (error: any) => void;
  showSuccess?: boolean;
  showError?: boolean;
  successMsg?: string;
  errorMsg?: string;
}

const formattedMsg = (msg: unknown): string => {
  if (typeof msg === 'string') {
    return msg;
  } else if (Array.isArray(msg)) {
    if (typeof msg[0] === 'string') {
      return msg.join('\n');
    } else if (typeof msg[0] === 'object') {
      return msg.map(x => JSON.stringify(x)).join('\n');
    } else {
      return 'Something went wrong!';
    }
  } else {
    return 'Something went wrong!';
  }
}

export const customFetchQuery = async ({
  api,
  apiProps = {},
  handleSuccess = () => {},
  handleError = () => {},
  showSuccess = false,
  showError = true,
  successMsg = 'Successful!',
  errorMsg = 'Something went wrong!',
}: CustomFetchQueryProps) => {
  try {
    const res = await api(apiProps);
    if (res?.data) {
      const msg = res?.data?.message || res?.data?.data?.message || successMsg;
      showSuccess &&
        Toast.show(
          formattedMsg(msg),
          { type: 'success', duration: 5000 },
        );
      handleSuccess(res?.data);
    } else {
      const msg = res?.error?.data?.message || errorMsg;
      showError &&
        Toast.show(
          formattedMsg(msg),
          {
            type: 'error',
            duration: 5000,
          },
        );
      handleError(res?.error);
    }
  } catch (msg) {
    showError &&
      Toast.show(
        formattedMsg(msg),
        {
          type: 'success',
          duration: 5000,
        },
      );
    handleError(msg);
  }
};
