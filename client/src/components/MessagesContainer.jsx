import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Message from './Message';
import SendMessage from './SendMessage';
import space from '../images/space.svg';
import { useParams } from 'react-router-dom';

const MessagesContainer = ({ user, messages, handleSubmit, showAlert }) => {
  const params = useParams();
  const containerRef = useRef(null);
  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_SERVER_BASE_URI}`);
    if (containerRef.current) {
      socket.on('send message', () => {
        // // console.log('Container Height => ', containerRef.current.scrollHeight);
        containerRef.current.scroll(0, containerRef.current.scrollHeight);
      });
      containerRef.current.scroll(0, containerRef.current.scrollHeight);
    }

    return () => {
      socket.emit(
        'leave room',
        JSON.stringify({ roomID: params.id, id: user.id, name: user.name })
      );
      socket.disconnect();
    };
  }, [containerRef]);
  return (
    <div className="col-span-4 order-1 lg:order-2">
      <div className="flex relative flex-col gap-4 bg-base-200 w-full h-[35rem] rounded-md p-4">
        {showAlert.canShow && (
          <div className="alert shadow-lg absolute max-w-fit left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2">
            <div>
              <span>{showAlert.message}</span>
            </div>
          </div>
        )}
        <div className="mb-16 h-full overflow-y-auto" ref={containerRef}>
          {messages && messages.length > 0 ? (
            messages.map((message, idx) => {
              return <Message message={message} user={user} key={idx} />;
            })
          ) : (
            <div className="flex flex-col h-full items-center justify-center">
              <img src={space} className="w-56 mb-4" alt="No message" />
              <p className="text-md capitalize font-medium">
                No messages, Say Hi!
              </p>
            </div>
          )}
        </div>
        <div className="form absolute bottom-4 left-4 right-4">
          <SendMessage handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
