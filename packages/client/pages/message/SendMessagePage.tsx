import SendMessageForm from '../../components/form/SendMessageForm';
import Layout from '../../components/layout/Layout';

export default function SendMessagePage() {
  return (
    <Layout>
      <SendMessageForm
        sendMessage={(
          text: string,
          receiver: string,
          tokenInEther: string
        ) => {}}
      />
    </Layout>
  );
}
