declare module "@vercel/analytics/react" {
  export interface AnalyticsProps {
    [key: string]: unknown;
  }

  export function Analytics(props: AnalyticsProps): null;
  export function track(name: string, properties?: Record<string, unknown>): void;
}
