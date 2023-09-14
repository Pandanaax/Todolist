<script>
import * as api from '../../api.js';

export default {
  data() {
    return {
      newTodoText: '',
    };
  },
  methods: {
    addTodo() {
      const trimmedText = this.newTodoText.trim();
      if (trimmedText !== '') {
        api.addItem({ text: trimmedText, is_complete: false });
        this.newTodoText = '';
        this.$emit('todo-added'); // Emit an event to notify the parent component
      }
    },
  },
};
</script>

