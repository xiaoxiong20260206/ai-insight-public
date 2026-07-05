import { useState, useEffect, useCallback } from 'react';
import { account, databases, client, DATABASE_ID, TABLE_ID, Permission, Role, ID, Query, OAuthProvider, handleOAuth2Token } from './lib/appwrite';

interface User {
  $id: string;
  name: string;
  email: string;
}

interface SubscriptionDoc {
  $id: string;
  username: string;
  is_active: boolean;
  subscribed_at: string;
  source: string;
}

type AuthState = 'checking' | 'logged-out' | 'logged-in';

function App() {
  const [authState, setAuthState] = useState<AuthState>('checking');
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionDoc | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ icon: string; message: string } | null>(null);

  const showToast = (icon: string, message: string) => {
    setToast({ icon, message });
    setTimeout(() => setToast(null), 3000);
  };

  const checkAuth = useCallback(async () => {
    try {
      await handleOAuth2Token(client);
    } catch (_) {}

    try {
      const u = await account.get();
      setUser(u as unknown as User);
      setAuthState('logged-in');
    } catch (_) {
      setAuthState('logged-out');
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authState === 'logged-in' && user) {
      loadSubscription();
    }
  }, [authState, user]);

  const loadSubscription = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, TABLE_ID, [
        Query.equal('username', user!.name),
      ]);
      if (res.documents.length > 0) {
        setSubscription(res.documents[0] as unknown as SubscriptionDoc);
      } else {
        setSubscription(null);
      }
    } catch (e) {
      console.error('Failed to load subscription', e);
    }
  };

  const handleLogin = () => {
    account.createOAuth2Session({
      provider: OAuthProvider.Kuaishou,
      success: window.location.origin + window.location.pathname,
      failure: window.location.origin + window.location.pathname,
    });
  };

  const handleSubscribe = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const doc = await databases.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        {
          username: user.name,
          kwai_user_id: user.$id,
          source: 'web_subscribe',
          is_active: true,
          subscribed_at: new Date().toISOString(),
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
      setSubscription(doc as unknown as SubscriptionDoc);
      showToast('✅', '订阅成功！明早08:00开始收到日报推送');
    } catch (e: any) {
      if (e?.code === 409 || e?.message?.includes('unique')) {
        showToast('ℹ️', '你已经订阅过了');
      } else {
        showToast('❌', '订阅失败: ' + (e?.message || '未知错误'));
      }
    }
    setLoading(false);
  };

  const handleUnsubscribe = async () => {
    if (!subscription) return;
    setLoading(true);
    try {
      await databases.updateDocument(DATABASE_ID, TABLE_ID, subscription.$id, {
        is_active: false,
      });
      setSubscription({ ...subscription, is_active: false });
      showToast('👋', '已取消订阅，不会再收到日报推送');
    } catch (e) {
      showToast('❌', '操作失败');
    }
    setLoading(false);
  };

  const handleResubscribe = async () => {
    if (!subscription) return;
    setLoading(true);
    try {
      await databases.updateDocument(DATABASE_ID, TABLE_ID, subscription.$id, {
        is_active: true,
        subscribed_at: new Date().toISOString(),
      });
      setSubscription({ ...subscription, is_active: true });
      showToast('✅', '重新订阅成功！');
    } catch (e) {
      showToast('❌', '操作失败');
    }
    setLoading(false);
  };

  if (authState === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="text-center">
          <div className="text-4xl animate-breathe mb-4">📡</div>
          <p className="text-gray-500">检查登录状态...</p>
        </div>
      </div>
    );
  }

  if (authState === 'logged-out') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="w-full max-w-md">
          {/* Decorative doodles */}
          <div className="absolute top-12 left-8 text-5xl opacity-20 animate-float">✦</div>
          <div className="absolute top-24 right-12 text-3xl opacity-15 animate-float delay-200">◇</div>
          <div className="absolute bottom-20 left-16 text-4xl opacity-10 animate-float delay-300">○</div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4" style={{ backgroundColor: 'var(--forest)', opacity: 0.9 }}>
                <span className="text-3xl">📡</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight mb-2" style={{ color: 'var(--ink)' }}>
                AI 洞察日报
              </h1>
              <p className="text-sm" style={{ color: 'var(--forest)' }}>
                每天 08:00 · AI 行业最值得关注的动态
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { icon: '🧠', text: '五大板块精选 15 条动态' },
                { icon: '🔥', text: '7 日热度趋势交叉分析' },
                { icon: '💡', text: '每板块深度聚焦 + 关键判断' },
                { icon: '❤️‍🔥', text: '林克自述：AI 助手进化感悟' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl animate-fade-in-up" style={{ backgroundColor: 'var(--cream)', animationDelay: `${i * 100}ms` }}>
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3.5 rounded-2xl text-white font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 cursor-pointer"
              style={{ backgroundColor: 'var(--forest-deep)' }}
            >
              快手 SSO 登录 · 一键订阅
            </button>

            <p className="text-center text-xs mt-4" style={{ color: '#999' }}>
              登录后可随时订阅或取消
            </p>
          </div>
        </div>
      </div>
    );
  }

  // logged-in
  const isSubscribed = subscription?.is_active === true;
  const hasRecord = subscription !== null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-3" style={{ backgroundColor: isSubscribed ? 'var(--forest)' : 'var(--sand)' }}>
              <span className="text-2xl">{isSubscribed ? '✅' : '📡'}</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight mb-1" style={{ color: 'var(--ink)' }}>
              {isSubscribed ? '已订阅 AI 洞察日报' : '订阅 AI 洞察日报'}
            </h1>
            <p className="text-sm" style={{ color: 'var(--forest)' }}>
              {user?.name} · 每天 08:00 推送
            </p>
          </div>

          {/* Status Card */}
          <div className="rounded-2xl p-5 mb-6" style={{ backgroundColor: isSubscribed ? 'rgba(46, 92, 85, 0.06)' : 'var(--cream)' }}>
            {isSubscribed ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full animate-breathe" style={{ backgroundColor: 'var(--forest)' }}></span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--forest)' }}>订阅活跃</span>
                </div>
                <div className="text-xs" style={{ color: '#888' }}>
                  订阅时间：{subscription?.subscribed_at ? new Date(subscription.subscribed_at).toLocaleDateString('zh-CN') : '—'}
                </div>
                <button
                  onClick={handleUnsubscribe}
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl border-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                  style={{ borderColor: '#ddd', color: '#999' }}
                >
                  取消订阅
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ddd' }}></span>
                  <span className="text-sm font-semibold" style={{ color: '#999' }}>未订阅</span>
                </div>
                {hasRecord && (
                  <div className="text-xs" style={{ color: '#aaa' }}>
                    曾于 {subscription?.subscribed_at ? new Date(subscription.subscribed_at).toLocaleDateString('zh-CN') : '—'} 订阅
                  </div>
                )}
                <button
                  onClick={hasRecord ? handleResubscribe : handleSubscribe}
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer disabled:opacity-50"
                  style={{ backgroundColor: 'var(--forest-deep)' }}
                >
                  {hasRecord ? '重新订阅' : '立即订阅'}
                </button>
              </div>
            )}
          </div>

          {/* What you'll get */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--ink)' }}>订阅后你会收到</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: '🧠', label: '大模型动态' },
                { icon: '⌨️', label: 'AI Coding' },
                { icon: '📱', label: 'AI 应用' },
                { icon: '🏭', label: 'AI 行业' },
                { icon: '🔄', label: '企业转型' },
                { icon: '❤️‍🔥', label: '林克自述' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: 'var(--cream)' }}>
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--ink)' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <a
              href="https://ai-insight-internal.frontend-cloud.corp.kuaishou.com/"
              className="text-xs underline transition-colors duration-200"
              style={{ color: 'var(--forest)' }}
            >
              查看往期日报 →
            </a>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-white rounded-2xl shadow-2xl p-4 max-w-sm transform transition-all duration-300 z-50 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{toast.icon}</span>
            <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
