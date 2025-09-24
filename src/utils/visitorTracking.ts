export interface VisitorData {
  id: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  browserInfo: {
    name: string;
    version: string;
    platform: string;
  };
  location: {
    country: string;
    city: string;
    region: string;
    timezone: string;
  };
  pageViews: string[];
  referrer: string;
  deviceInfo: {
    type: 'mobile' | 'tablet' | 'desktop';
    screenWidth: number;
    screenHeight: number;
    viewport: {
      width: number;
      height: number;
    };
  };
  sessionDuration: number;
  isReturning: boolean;
}

class VisitorTracker {
  private sessionId: string;
  private startTime: number;
  private pageViews: string[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private getBrowserInfo() {
    const ua = navigator.userAgent;
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    
    if (ua.includes('Chrome')) {
      browserName = 'Chrome';
      browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Firefox')) {
      browserName = 'Firefox';
      browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Safari')) {
      browserName = 'Safari';
      browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Edge')) {
      browserName = 'Edge';
      browserVersion = ua.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown';
    }

    return {
      name: browserName,
      version: browserVersion,
      platform: navigator.platform
    };
  }

  private getDeviceInfo() {
    const width = window.screen.width;
    const height = window.screen.height;
    
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (width <= 768) deviceType = 'mobile';
    else if (width <= 1024) deviceType = 'tablet';

    return {
      type: deviceType,
      screenWidth: width,
      screenHeight: height,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }

  private async getLocationData(): Promise<any> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown',
        region: data.region || 'Unknown',
        timezone: data.timezone || 'Unknown'
      };
    } catch (error) {
      return {
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        timezone: 'Unknown'
      };
    }
  }

  private async getIPAddress(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'Unknown';
    }
  }

  private isReturningVisitor(): boolean {
    const hasVisited = localStorage.getItem('visitor_has_visited');
    if (!hasVisited) {
      localStorage.setItem('visitor_has_visited', 'true');
      return false;
    }
    return true;
  }

  public trackPageView(page: string) {
    this.pageViews.push(page);
    this.saveVisitorData();
  }

  private async initializeTracking() {
    const [ipAddress, locationData] = await Promise.all([
      this.getIPAddress(),
      this.getLocationData()
    ]);

    const visitorData: VisitorData = {
      id: this.sessionId,
      timestamp: new Date().toISOString(),
      ipAddress,
      userAgent: navigator.userAgent,
      browserInfo: this.getBrowserInfo(),
      location: locationData,
      pageViews: [window.location.pathname],
      referrer: document.referrer || 'Direct',
      deviceInfo: this.getDeviceInfo(),
      sessionDuration: 0,
      isReturning: this.isReturningVisitor()
    };

    this.saveVisitorData(visitorData);
  }

  private saveVisitorData(data?: VisitorData) {
    if (data) {
      const visitors = this.getStoredVisitors();
      visitors.push(data);
      localStorage.setItem('visitor_analytics', JSON.stringify(visitors));
    } else {
      // Update existing session
      const visitors = this.getStoredVisitors();
      const currentSession = visitors.find(v => v.id === this.sessionId);
      if (currentSession) {
        currentSession.pageViews = [...new Set([...currentSession.pageViews, ...this.pageViews])];
        currentSession.sessionDuration = Date.now() - this.startTime;
        localStorage.setItem('visitor_analytics', JSON.stringify(visitors));
      }
    }
  }

  public getStoredVisitors(): VisitorData[] {
    const stored = localStorage.getItem('visitor_analytics');
    return stored ? JSON.parse(stored) : [];
  }

  public clearAnalytics() {
    localStorage.removeItem('visitor_analytics');
    localStorage.removeItem('visitor_has_visited');
  }

  public getAnalyticsSummary() {
    const visitors = this.getStoredVisitors();
    const totalVisitors = visitors.length;
    const uniqueIPs = new Set(visitors.map(v => v.ipAddress)).size;
    const returningVisitors = visitors.filter(v => v.isReturning).length;
    const countries = [...new Set(visitors.map(v => v.location.country))];
    const browsers = [...new Set(visitors.map(v => v.browserInfo.name))];
    const devices = visitors.reduce((acc, v) => {
      acc[v.deviceInfo.type] = (acc[v.deviceInfo.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalVisitors,
      uniqueIPs,
      returningVisitors,
      newVisitors: totalVisitors - returningVisitors,
      countries,
      browsers,
      devices,
      averageSessionDuration: visitors.reduce((acc, v) => acc + v.sessionDuration, 0) / totalVisitors || 0
    };
  }
}

export const visitorTracker = new VisitorTracker();