import { AxiosError } from 'axios';
import { useToast } from './ui';

type typeVariant = 'default' | 'destructive';

interface IToastText {
  title: string;
  description: string;
  variant?: typeVariant;
}

type actions = 'login' | 'loginFailed' | 'error' | 'logout' | 'emptyImage' | 'uploadedImage' | 'deletedImage' | 'update' | 'create' | 'delete';

const toastTexts: Record<actions, IToastText> = {
  login: {
    title: 'Logined Successfully!',
    description: 'You will redirect to Admin Panel'
  },
  loginFailed: {
    title: 'Incorrect username or password',
    description: 'Please try again.',
    variant: 'destructive'
  },
  logout: {
    title: 'Logout Successfully!',
    description: 'You are redirecting to Reint'
  },
  uploadedImage: {
    title: 'Uploaded Successfully!',
    description: 'Uploaded image.',
  },
  deletedImage: {
    title: 'Deleted Successfully!',
    description: 'Deleted image.',
  },
  emptyImage: {
    title: 'No images',
    description: 'Upload an image',
    variant: 'destructive'
  },
  update: {
    title: 'Updated.',
    description: 'Updated Successfully!',
  },
  create: {
    title: 'Created.',
    description: 'Created Successfully!',
  },
  delete: {
    title: 'Deleted.',
    description: 'Deleted Successfully!'
  },
  error: {
    title: 'An error happened',
    description: 'Please try again.',
    variant: 'destructive'
  }
}

type Props = {
  defaultText?: actions;
  title?: string | AxiosError<{ title: string }>;
  description?: any
  variant?: typeVariant;
}


const ToastMessage = () => {
  const { toast } = useToast();

  const getText = (text?: string) => {
    if (typeof text == 'string') return text;
    return null;
  }

  const getMessage = ({ defaultText, title, description, variant }: Props) => {
    const defaultMsg = defaultText && toastTexts[defaultText];
    const msg: IToastText = {
      title:
        typeof title == 'object' && title?.response?.data?.title ||
        typeof title == 'string' && title ||
        defaultMsg?.title || 'No Title',

      description:
        getText(description?.response?.data?.message) ||
        getText(description?.data?.message) ||
        getText(description) ||
        getText(defaultMsg?.description) || 'No description',

      variant: typeof variant == 'string' && variant || defaultMsg?.variant || 'default'
    };
    return toast(msg)
  }

  return getMessage;
}

export default ToastMessage