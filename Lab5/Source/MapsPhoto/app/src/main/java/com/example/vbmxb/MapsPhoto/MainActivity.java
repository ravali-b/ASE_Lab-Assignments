package com.example.vbmxb.gmapsphotoapp;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import android.content.CursorLoader;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.common.api.GoogleApiClient;


public class MainActivity extends AppCompatActivity {
    Button button_map, button_photo,b2;
    int TAKE_PHOTO_CODE = 0;
    int SELECT_FILE=1;
    ImageView userImage ;
    static Bitmap photo;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

         b2=(Button)findViewById(R.id.bu2);

        userImage = (ImageView) findViewById(R.id.profilePic);
        button_map = (Button) findViewById(R.id.main_btn_maps);
        button_photo = (Button) findViewById(R.id.main_btn_photo);

        b2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText b1=(EditText)findViewById(R.id.editText5);

                b1.setText(R.string.text);
            }
        });

    }

    public void onClickOfMapButton(View v) {
        //This code redirects the from main page to the maps page.
        Intent redirect = new Intent(MainActivity.this, MapsActivity.class);
        startActivity(redirect);
    }
    public void onClickOfPhotoButton(View v) {
        //This code redirects to the photo activity.
//        Intent redirect = new Intent(MainActivity.this, PhotoActivity.class);
//        startActivity(redirect);
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(cameraIntent, TAKE_PHOTO_CODE);
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == TAKE_PHOTO_CODE && resultCode == RESULT_OK) {
            photo = (Bitmap) data.getExtras().get("data");
            userImage.setImageBitmap(photo);
            Log.d("CameraDemo", "Pic saved");
        }
        if(requestCode == SELECT_FILE && resultCode == RESULT_OK){
            Uri imageUri = data.getData();
            Bitmap bm=null;
            try {
                bm = MediaStore.Images.Media.getBitmap(this.getContentResolver(), imageUri);
            } catch(Exception E){};
            Bitmap bms = Bitmap.createScaledBitmap(bm, 250, 250, false);
            photo=bms;
            userImage.setImageBitmap(photo);

            Log.d("CameraDemo", "Gallery pic saved");
        }
    }
    public void uploadClick(View v){
        Intent intent = new Intent(
                Intent.ACTION_PICK,
                android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        intent.setType("image/*");
        startActivityForResult(Intent.createChooser(intent, "Select File"),SELECT_FILE);
    }

}
