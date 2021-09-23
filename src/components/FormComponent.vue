<template>
  <fragment>
    <div class="row">
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg">Last name <span class="text-danger">*</span></label>
        <input type="text" v-model="lastname"  class="form-control form-control-lg">
        <div v-if="!lastname.required" class="invalid-feedback">The last name field is required.</div>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg"> First name <span class="text-danger">*</span></label>
        <input type="text" v-model="firstname"  class="form-control form-control-lg">
        <div v-if="!firstname.required" class="invalid-feedback">The full name field is required.</div>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg">Phone<span class="text-danger">*</span></label>
        <vue-tel-input v-model="phone" class="form-control form-control-lg"></vue-tel-input>

      </div>
      <div class="flex flex-wrap items-center p-3" slot="footer">
        <vs-button type="filled" icon="done"  @click="submit" color="success" >Submit</vs-button>
        <vs-button type="filled"  icon="cancel" class="ml-4"   @click="resetData" color="danger">Cancel</vs-button>
      </div>
    </div>
    <div>
      <vs-table max-items="3" pagination search :data="users">
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
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </fragment>
</template>
<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      phone: '',
      list: [],
      users:[
        {
          "id": 1,
          "firstname": "Bret",
          "lastname": "Sincere@april.biz",
          "phone": "+2565655965",
        },
        {
          "id": 2,
          "firstname": "Antonette",
          "lastname": "Shanna@melissa.tv",
          "phone": "+268859889",
        },
        {
          "id": 3,
          "firstname": "Samantha",
          "lastname": "Nathan@yesenia.net",
          "phone": "+2588688956",
        },
        {
          "id": 4,
          "firstname": "Karianne",
          "lastname": "Julianne.OConner@kory.org",
          "phone": "+2549782986",
        },
      ]
    }
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    validateForm1 () {
      if (
          (this.lastname !== ''
              && this.firstname !== ''
              && this.phone !== ''
          )) return true
    },
    List_Users () {
      return this.$store.state.users
    },
  },
  methods: {

    resetData() {
      this.$vs.loading()
      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 500);
      this.firstname = '';
      this.lastname = '';
      this.phone = '';
    },


    submit() {
      const obj = {
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phone,
      }
      this.$store.dispatch('addItem', obj)
      this.resetData();
    }
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
