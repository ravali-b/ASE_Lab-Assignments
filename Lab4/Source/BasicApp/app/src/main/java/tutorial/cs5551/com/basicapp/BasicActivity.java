package tutorial.cs5551.com.basicapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class BasicActivity extends AppCompatActivity {

    TextView outputTextView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_basic);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        outputTextView = (TextView) findViewById(R.id.txt_Result);
    }
    public void logout(View v) {
        Intent redirect = new Intent(BasicActivity.this, LoginActivity.class);
        startActivity(redirect);
    }
    public void recordDetails(View v) {
        EditText firstnameCtrl = (EditText) findViewById(R.id.txt_fname);
        EditText lastnameCtrl = (EditText) findViewById(R.id.txt_lname);
        EditText usernameCtrl = (EditText) findViewById(R.id.txt_uname);
        EditText emailCtrl = (EditText) findViewById(R.id.txt_email);
        EditText passwordCtrl = (EditText) findViewById(R.id.txt_Pwd);
        TextView errorText = (TextView) findViewById(R.id.lbl_Error);
        String userName = usernameCtrl.getText().toString();
        String password = passwordCtrl.getText().toString();
            //This code redirects the from register page to the home page.
        Intent redirect = new Intent(BasicActivity.this, HomeActivity.class);
        startActivity(redirect);
        }
    }


