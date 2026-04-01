'use client';

import * as React from 'react';
import { Check, Info, LoaderCircle, TriangleAlert, X } from 'lucide-react';
import { toast, type ExternalToast } from 'sonner';

type AlertStatus = 'info' | 'error' | 'success' | 'warning' | 'loading';

export interface CustomToastOptions {
  duration?: number;
  infoBoxBg?: string;
  errorBoxBg?: string;
  successBoxBg?: string;
  warningBoxBg?: string;
  loadingBoxBg?: string;
  infoIconBg?: string;
  infoIconFill?: string;
  errorIconBg?: string;
  errorIconFill?: string;
  warningIconBg?: string;
  warningIconFill?: string;
  successIconBg?: string;
  successIconFill?: string;
  loadingIconBg?: string;
  loadingIconFill?: string;
}

export interface MessageOptions extends Omit<ExternalToast, 'id'> {
  id?: string | number;
  title?: React.ReactNode;
  status?: AlertStatus;
  isClosable?: boolean;
}

type StatusStyle = {
  boxBg?: string;
  iconBg: string;
  iconColor: string;
};

const iconWrapperStyle = (background: string): React.CSSProperties => ({
  width: '20px',
  height: '20px',
  borderRadius: '9999px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background
});

const iconStyle = (color: string): React.CSSProperties => ({
  width: '14px',
  height: '14px',
  color
});

const renderIcon = (status: AlertStatus, style: StatusStyle) => {
  if (status === 'success') {
    return (
      <span style={iconWrapperStyle(style.iconBg)}>
        <Check style={iconStyle(style.iconColor)} />
      </span>
    );
  }

  if (status === 'error') {
    return (
      <span style={iconWrapperStyle(style.iconBg)}>
        <X style={iconStyle(style.iconColor)} />
      </span>
    );
  }

  if (status === 'warning') {
    return (
      <span style={iconWrapperStyle(style.iconBg)}>
        <TriangleAlert style={iconStyle(style.iconColor)} />
      </span>
    );
  }

  if (status === 'loading') {
    return (
      <span style={iconWrapperStyle(style.iconBg)}>
        <LoaderCircle className="animate-spin" style={iconStyle(style.iconColor)} />
      </span>
    );
  }

  return (
    <span style={iconWrapperStyle(style.iconBg)}>
      <Info style={iconStyle(style.iconColor)} />
    </span>
  );
};

export function useMessage(props?: CustomToastOptions) {
  const statusMap = React.useMemo<Record<AlertStatus, StatusStyle>>(
    () => ({
      info: {
        boxBg: props?.infoBoxBg,
        iconBg: props?.infoIconBg || '#DBF3FF',
        iconColor: props?.infoIconFill || '#0884DD'
      },
      error: {
        boxBg: props?.errorBoxBg,
        iconBg: props?.errorIconBg || '#FEE4E2',
        iconColor: props?.errorIconFill || '#D92D20'
      },
      success: {
        boxBg: props?.successBoxBg,
        iconBg: props?.successIconBg || '#D0F5DC',
        iconColor: props?.successIconFill || '#039855'
      },
      warning: {
        boxBg: props?.warningBoxBg,
        iconBg: props?.warningIconBg || '#FEF0C7',
        iconColor: props?.warningIconFill || '#D97706'
      },
      loading: {
        boxBg: props?.loadingBoxBg,
        iconBg: props?.loadingIconBg || '#FEF0C7',
        iconColor: props?.loadingIconFill || '#D97706'
      }
    }),
    [props]
  );

  const message = React.useCallback(
    (options: MessageOptions) => {
      const { title, status = 'info', duration, isClosable, ...rest } = options;
      const statusStyle = statusMap[status];

      const toastOptions: ExternalToast = {
        ...rest,
        id: options.id,
        duration: duration ?? props?.duration,
        closeButton: isClosable,
        icon: renderIcon(status, statusStyle),
        style: statusStyle.boxBg ? { background: statusStyle.boxBg } : undefined
      };

      if (status === 'loading') {
        return toast.loading(title, toastOptions);
      }

      return toast(title, toastOptions);
    },
    [props?.duration, statusMap]
  );

  return { message };
}
