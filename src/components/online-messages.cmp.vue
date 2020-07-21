<template>
  <section class="onlie-messages">
       <h1>nn{{ msg.txt }}</h1>
  </section>    

</template>

<script>

import SocketService from '@/services/SocketService';

export default {
  name: "online-messages",
 
  data() {
    return {
      msg: {from: 'Me', txt: ''},
      msgs: [],
      topic : 'Love'
    }
  },
      created() {
    SocketService.setup();
    // SocketService.emit('chat topic', this.topic)

    SocketService.on('chat addMsg', _msg=>{this.msg=_msg})

    console.log(this.msg)
  
 
  },
  destroyed() {
    SocketService.off('chat addMsg', this.msg)
    SocketService.terminate();
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
      
    },
    // sendMsg() {
    //   console.log('Sending', this.msg);; 
    //   SocketService.emit('chat newMsg', this.msg)
    //   this.msg = {from: 'Me', txt: ''};//user join event
    // },
    // changeTopic() {
    //   SocketService.emit('chat topic', this.topic)
    // }
  },
  watch: {
    topic() {
      // console.log('Topic Changed', this.topic);
    },
    'msg.txt'() {
      console.log('MSG CHANGED');
     
    },
    msgs: {
      handler() {
        // console.log('New msg arrival!');
      }
    }
  }
    
  

};

</script>
