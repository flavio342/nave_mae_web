import io from 'socket.io-client';

export default {
  name: "messages",
  components: {},
  props: ["data"],
  data() {
    return {
      selected_relative:null,
      message: "",
      socket : io('http://0.0.0.0:8080'),
      message_list: []
    };
  },
  computed: {},
  mounted: function() {
    this.socket.on('chat_broadcast', (data) => {
        console.log(data)
        if(data.from_type != 'manager' || data.from_id != this.data.id)
        this.message_list.push({
          msg: data.message,
          from: "you"
        })
    });
  },
  methods: {
    select_relative(relative){
      this.selected_relative = relative
    },
    send_message(){

      this.message_list.push({
        msg: this.message,
        from: "me"
      })

      this.socket.emit('chat_in', {
        from_id: this.data.id,
        from_type: "manager",
        message: this.message,
        to_id: this.selected_relative.id,
        to_type: "relative"
      });

      this.message = ""
    }
  }
};
