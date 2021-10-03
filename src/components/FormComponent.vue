<template>
  <fragment>
    <div class="row">
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg">Last name <span class="text-danger">*</span></label>
        <input type="text" v-model="lastname"  class="form-control form-control-lg">
        <vs-alert v-if="error_lastname" color="danger" icon="new_releases" >
          <span>The last name field is required<b> maximum three characters. </b></span>
        </vs-alert>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg"> First name <span class="text-danger">*</span></label>
        <input type="text" v-model="firstname"  class="form-control form-control-lg">
        <vs-alert v-if="error_firstname" color="danger" icon="new_releases" >
          <span>The first name field is required<b> maximum five characters. </b></span>
        </vs-alert>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg">Phone <span class="text-danger">*</span></label>
        <vue-tel-input v-model="phone" :validCharactersOnly = true class="form-control form-control-lg"></vue-tel-input>
        <vs-alert :active="inputValid" color="danger" icon="new_releases" >
          <span>Put a good <b>phone number.</b></span>
        </vs-alert>
      </div>
      <div class="flex flex-wrap items-center p-3" slot="footer">
        <vs-button type="filled" icon="done" :disabled="!validate || inputValid || error_lastname || error_lastname " @click="submit" color="success" >Submit</vs-button>
        <vs-button type="filled"  icon="cancel" class="ml-4"   @click="resetData" color="danger">Cancel</vs-button>
      </div>
    </div>
    <div>
      <vs-table max-items="3" pagination search :data="Users">
        <template slot="header">
          <h3>
            Contacts
          </h3>
        </template>
        <template slot="thead">
          <vs-th>N°</vs-th>
          <vs-th>Last name</vs-th>
          <vs-th>First name</vs-th>
          <vs-th>Phone</vs-th>
          <vs-th>Actions</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            <vs-td :data="data[indextr].id">
              {{data[indextr].id}}
            </vs-td>
            <vs-td :data="data[indextr].lastname">
              {{data[indextr].lastname}}
            </vs-td>
            <vs-td :data="data[indextr].firstname">
              {{data[indextr].firstname}}
            </vs-td>
            <vs-td :data="data[indextr].id">
              {{data[indextr].phone}}
            </vs-td>

            <vs-td>
              <vs-button @click.stop="openContact(tr)" @click="activePrompt = true" color="warning" size="small" type="filled" icon="edit"></vs-button>
              <vs-button @click.stop="deleteUser(tr.id)"  color="danger" size="small" type="filled" class="ml-1" icon="delete"></vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <vs-prompt
          color="warning"
          title="Edit contact"
          @cancel="this.val_up.lastname_up=''; this.val_up.firstname_up='';this.val_up.phone_up=''"
          @accept="updateUser"
          @close="closeAlert"
          :is-valid="!error_lastname_up&&!error_firstname_up&&!inputValid_up"
         :active.sync="activePrompt">
        <div class="col-12 form-group">
          <label class="col-form-label col-form-label-lg">Last name <span class="text-danger">*</span></label>
          <input  v-model="val_up.lastname_up" class="form-control form-control-lg">
          <vs-alert v-if="error_lastname_up" color="danger" icon="new_releases" >
            <span><b> required maximum three characters. </b></span>
          </vs-alert>

          <label class="col-form-label col-form-label-lg"> First name <span class="text-danger">*</span></label>
          <input  v-model="val_up.firstname_up" class="form-control form-control-lg">
          <vs-alert v-if="error_firstname_up" color="danger" icon="new_releases" >
            <span><b> required maximum five characters. </b></span>
          </vs-alert>

          <label class="col-form-label col-form-label-lg">Phone <span class="text-danger">*</span></label>
          <vue-tel-input v-model="val_up.phone_up" :validCharactersOnly =true class="form-control form-control-lg"></vue-tel-input>
          <vs-alert :active="inputValid_up" color="danger" icon="new_releases" >
            <span>Put a good <b>phone number.</b></span>
          </vs-alert>

        </div>
      </vs-prompt>
    </div>
  </fragment>
</template>
<script>
export default {
  name:'FormComponent',
  data() {
    return {
      lastname: '',
      firstname: '',
      phone: '',
      activePrompt:false,
      val_up:{
        lastname_up:'',
        firstname_up:'',
        phone_up:''
      }
    }
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    validate() {
      if (
          (      this.lastname !== ''
              && this.firstname !== ''
              && this.phone !== ''
          )) return true
    },
    Users () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.users =this.$store.state.users
    },
    inputValid(){
      return !/\d+$/.test(this.phone) ;
    },
    error_lastname () {
      return this.lastname.trim().length < 3
    },
    error_firstname () {
      return this.firstname.trim().length < 5
    },
    inputValid_up(){
      return !/\d+$/.test(this.val_up.phone_up) ;
    },
    error_lastname_up () {
      return this.val_up.lastname_up.trim().length < 3
    },
    error_firstname_up () {
      return this.val_up.firstname_up.trim().length < 5
    },
  },

  methods: {
    resetData() {
      this.load()
      this.firstname = ''
      this.lastname = ''
      this.phone = ''
    },
    resetData_up() {
      this.load()
      this.val_up.firstname_up = ''
      this.val_up.lastname_up = ''
      this.val_up.phone_up = ''
    },
    submit() {
      const obj = {
        id: this.$store.state.items + 1,
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phone,
      }
      this.$store.dispatch('addItem', obj)
      this.$vs.notify({
        color:'success',
        icon:'done',
        text:'contact save',
        position:'top-right'
      })
      this.resetData();
    },

    deleteUser(id){
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Confirmation',
        text: 'Do you want to Delete the contact?',
        accept: async () => {
          this.load()
          await this.$store.dispatch('removeItem', id)
          this.$vs.notify({
            color:'success',
            icon:'delete',
            text:'contact delete',
            position:'top-right'
          })
        }
      })
    },

    updateUser(){
      this.load()
      const obj = {
        id: this.id,
        firstname: this.val_up.firstname_up,
        lastname: this.val_up.lastname_up,
        phone: this.val_up.phone_up,
      }
      this.$store.dispatch('updateItem', obj)
      this.acceptAlert()
      this.resetData_up()
    },

    load(){
      this.$vs.loading()
      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 500);
    },
    acceptAlert(){
      this.$vs.notify({
        color:'success',
        icon:'edit',
        text:'contact edit',
        position:'top-right'
      })
    },
    closeAlert(){
      this.$vs.notify({
        color:'warning',
        icon:'cancel',
        text:'Edit cancel'
      })
    },
    openContact (user) {
      this.id = user.id
      this.val_up.lastname_up = user.lastname
      this.val_up.firstname_up = user.firstname
      this.val_up.phone_up = user.phone
    },
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
