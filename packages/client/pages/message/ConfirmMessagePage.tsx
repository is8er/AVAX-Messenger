import { BigNumber } from 'ethers';

import MessageCard from '../../components/card/MessageCard';
import Layout from '../../components/layout/Layout';
import { Message } from '../../hooks/useMessengerContract';

export default function ConfirmMessagePage() {
  const message: Message = {
    depositInWei: BigNumber.from('1000000000000000000'),
    timestamp: new Date(1),
    text: 'message',
    isPending: true,
    sender: '0x~',
    receiver: '0x~',
  };
  let ownMessages: Message[] = [message, message];

  return (
    <Layout>
      {ownMessages.map((message, index) => {
        return (
          <div key={index}>
            <MessageCard
              message={message}
              onClickAccept={() => {}}
              onClickDeny={() => {}}
            />
          </div>
        );
      })}
    </Layout>
  );
}
