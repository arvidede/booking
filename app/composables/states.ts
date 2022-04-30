export const useSharedState = () => useState<string>('shared', () => 'shared state')
