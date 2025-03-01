import axios from 'axios';

// Data
export type SDKMessage = {
  eventType: string;
  eventData?: unknown;
};
// Androi
interface AndroidYoTechSDK {
  onMessage: (message: string) => void;
}
// Ios
interface IOSYoTechSDK {
  postMessage: (message: string) => void;
}

// Device type
declare global {
  interface Window {
    YoTechSDK?: AndroidYoTechSDK;
    webkit?: { messageHandlers?: { YoTechSDK?: IOSYoTechSDK } };
  }
}

const OVERLAY_ID = '__sdk_debug_overlay';
const CONTAINER_ID = '__sdk_debug_container';
let isShowing = false;
const messages: string[] = [];

// function debug 1
const _toggleDebugScreen = () => {
  if (!isShowing) {
    const overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.style.backgroundColor = `rgba(0,0,0,0.5)`;
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.bottom = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';

    const container = document.createElement('div');
    container.id = CONTAINER_ID;
    container.style.overflow = 'auto';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.paddingTop = '40px';

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    if (messages.length) {
      messages.forEach(message => {
        _addDebugMessage(message);
      });
    }

    isShowing = true;
  } else {
    isShowing = false;
    const overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
      document.body.removeChild(overlay);
    }
  }
};

// function debug 2
const _addDebugMessage = (debugMessage: string) => {
  const text = document.createElement('p');
  text.innerHTML = debugMessage;
  text.style.fontSize = '16px';
  text.style.color = 'white';
  const messageContainer = document.getElementById(CONTAINER_ID);
  messageContainer?.appendChild(text);
  messages.push(debugMessage);
};

// function thông báo lỗi
let messageHandler = (message: SDKMessage) => {
  console.log('Unhandled Message', JSON.stringify(message, null, 2));
};

const DEBUG_EVENTS = {
  ADD_DEBUG_MESSAGE: 'ADD_DEBUG_MESSAGE',
  TOGGLE_DEBUG_SCREEN: 'TOGGLE_DEBUG_SCREEN',
};

// function nhận data
window.addEventListener(
  'message',
  event => {
    try {
      let message: SDKMessage = JSON.parse(event.data);
      if (message?.eventType === DEBUG_EVENTS.ADD_DEBUG_MESSAGE) {
        _addDebugMessage(JSON.stringify(event.data));
      } else if (message?.eventType === DEBUG_EVENTS.TOGGLE_DEBUG_SCREEN) {
        _toggleDebugScreen();
      } else {
        messageHandler(message);
      }
    } catch (e: any) {
      messageHandler({ eventType: "EROOR", eventData: event.data });
      return;
    }
  },
  false
);

export type SKDParams = {
  templateKey: string;
  campaignId: string;
  token: string;
  inset?: { top: number; right: number; bottom: number; left: number };
};

export type SystemInfo = {
  currentTime: string;
};

export type ProductionInfo = {
  enable: string;
  cifs: string[];
};
export type Config = {
  [key: string]: any;
};
export type GameInstance = {
  gameId: string;
  config: { [key: string]: any };
};

export type GameConfig = {
  name: string;
  startTime: number;
  endTime: number;
  show: boolean;
  isNV: boolean
};

export type UserQuest = {
  questId: string;
  userQuestId: string;
  name: string;
  description: string;
  goal: number;
  progress: number;
  progressAt: string;
  claimed: boolean;
  claimedAt: string;
  completedQuestCount: number;
  repeat?: {
    amount: number;
    timeAmount: number;
    timeUnit: string;
  };
  data?: {
    title: string;
    game: string;
    isHidden: boolean;
    index: number;
    icon: string;
  };
};
export type Reward = {
  itemId: string;
  itemData: { description: string; name: string; index: number };
  itemType: string;
};

const sdkParams = {} as SKDParams;
const instanceConfig: Config = {};
let apiUrl = '';
let headersData = { 'x-user-token': sdkParams.token };
const yoTechSDK = {
  init: async (_apiUrl: string): Promise<GameInstance> => {
    apiUrl = _apiUrl;
    // load configuration
    const supportedParams = ['templateKey', 'campaignId', 'token'];
    const otherParams = ['inset'];

    const searchParams = new window.URLSearchParams(window.location.search);
    const hashParams = new window.URLSearchParams(window.location.hash);

    for (let key of supportedParams) {
      (sdkParams as any)[key] = searchParams.get(key) || hashParams.get(key);
      if (!(sdkParams as any)[key] || typeof (sdkParams as any)[key] !== 'string') {
        throw new Error(`Missing ${key}!`);
      }
    }
    for (let key of otherParams) {
      let param = searchParams.get(key) || hashParams.get(key);
      if (key === 'inset' && param) {
        const frags = param.split(';');
        const inset = {
          top: Number(frags[0]),
          right: Number(frags[1]),
          bottom: Number(frags[2]),
          left: Number(frags[3]),
        };
        sdkParams.inset = inset;
        document.documentElement.style.setProperty('--inset-top', `${inset.top}px`);
        document.documentElement.style.setProperty('--inset-right', `${inset.right}px`);
        document.documentElement.style.setProperty('--inset-bottom', `${inset.bottom}px`);
        document.documentElement.style.setProperty('--inset-left', `${inset.left}px`);
      } else {
        (sdkParams as any)[key] = param;
      }
    }
    headersData['x-user-token'] = sdkParams.token;
    if (sdkParams.campaignId === 'test') {
      return { gameId: 'test', config: instanceConfig };
    } else {
      const resp = await axios.get(`${apiUrl}/api/game/gameInstance/${sdkParams.templateKey}`);
      Object.keys(resp.data).forEach(key => {
        instanceConfig[key] = resp.data[key];
      });
      return resp.data as GameInstance;
    }
  },

  getUserQuests: async (id: string) => {
    const resp = await axios.get(`${apiUrl}/api/game/example?id=${id}`, {
      headers: headersData,
      
    });
    return resp.data as UserQuest[];
  },

  useTickets: async (id: string) => {
    const resp = await axios.post(
      `${apiUrl}/api/example`,
      {
        id,
      },
      {
        headers: headersData,
      }
    );
    return resp.data as Reward[];
  },

  registerHandler: (handler: (message: SDKMessage) => void) => {
    messageHandler = handler;
  },

  // function gửi đi
  postMessage: (message: SDKMessage) => {
    if (window.YoTechSDK) {
      window.YoTechSDK.onMessage(JSON.stringify(message));
    }
    if (window.webkit?.messageHandlers?.YoTechSDK) {
      window.webkit.messageHandlers.YoTechSDK.postMessage(JSON.stringify(message));
    }
  },

  getParams: (): SKDParams => sdkParams,
  getInstanceConfig: () => instanceConfig,
  isShowingDebugScreen: () => isShowing,
  addDebugMessage: _addDebugMessage,
  toggleDebugScreen: _toggleDebugScreen,
  DEBUG_EVENTS,
};

export default yoTechSDK;
